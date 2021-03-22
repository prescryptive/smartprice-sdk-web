// Copyright 2021 Prescryptive Health Inc
import '@testing-library/jest-dom/extend-expect'
import {registerPopupIframe, init, registerUser, sendVerificationCode, isRegisteredUser, getMemberInformation, getDeviceToken, registerAppUser} from './index';
import axios from 'axios';
import dateParser from './utils/dateParser';
import phoneParser from './utils/phoneParser';

jest.mock('axios');
jest.mock('./utils/phoneParser');
jest.mock('./utils/dateParser');

describe('SDK Modal can', () => {

  beforeEach(() => {
    const button = document.querySelector('.smartprice-button');
    if (button){
      button.remove();
    }
    const anchor = document.querySelector('.iframe-lightbox-link');
    if (anchor){
      anchor.remove();
    }
  })

  it('register a popup iframe', () => {
    const a = document.createElement('a');
    a.className = "iframe-lightbox-link";
    document.body.appendChild(a);
    registerPopupIframe();
    expect(document.querySelector(".iframe-lightbox-link").className).toEqual('iframe-lightbox-link iframe-lightbox-link--is-binded');
  });

  it('init a smartprice button', () => {
    const div = document.createElement('div');
    div.className = "smartprice-button";
    document.body.appendChild(div);
    init();
    expect(document.querySelector('.iframe-lightbox-link').innerText).toEqual("Save with SmartPRICE™");
  })

  it('init a smartprice button with params', () => {
    const endpoint = `https://test.smartprice.myrx.io/sdk-modal/?fn=Phil&ln=Jones&em=phil.jones@email.com&ph=1234567890&dob=2000-08-21`;
    const div = document.createElement('div');
    div.className = "smartprice-button";
    document.body.appendChild(div);
    init("Phil", "Jones", "phil.jones@email.com", "1234567890", "2000-08-21");
    expect(document.querySelector('.iframe-lightbox-link').href).toEqual(endpoint);
  })
})

describe('SDK can', () => {

  beforeEach(() => {
    phoneParser.getPhoneNumber.mockClear();
    dateParser.getDateOfBirth.mockClear();
  });

  it('fetches the verify phone code in test env', async () => {

    const phoneNumberMock = "1234567890";
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return '+1' + phoneNumberMock; 
    });

    const code = { data: 43211 };
    axios.post.mockImplementation(() => Promise.resolve(code));

    const result = sendVerificationCode(phoneNumberMock, 'test');
   
    await expect(result).resolves.toEqual(code.data);
 
    expect(axios.post).toHaveBeenCalledWith(
      `https://test.myrx.io/api/v1/one-time-password/send`,{phoneNumber: "+11234567890"}
    );
  });


  it('registerUser at API in test env', async () => {
    const phoneNumber = "1234567890";
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return '+1' + phoneNumber; 
    });
    dateParser.getDateOfBirth.mockImplementationOnce(() => {
      return new Date("2000-08-22"); 
    });
    const form = {
      firstName: "John",
      lastName: "Perez",
      email: "jonh@email.com",
      dateOfBirth: "2000-08-22",
      phoneNumber: "1234567890",
      verifyCode: '24122',
    };
    const memberId = {data: 43211};
 
    axios.post.mockImplementation(() => Promise.resolve(memberId));
 
    await expect(registerUser(form, 'test')).resolves.toEqual(memberId.data);
    expect(axios.post).toHaveBeenCalledWith(
      `https://test.myrx.io/api/v1/smart-price/register`, {...form, dateOfBirth: new Date("2000-08-22"), phoneNumber: '+1' + phoneNumber}
    );
  });

  it ('calls isRegisteredUser with valid parameters in test env', async () => {
    const result = {data: true};  
    const deviceToken = '1111111';
    axios.get.mockImplementation(() => Promise.resolve(result));
    await expect(isRegisteredUser(deviceToken, 'test')).resolves.toEqual(result.data);
    expect(axios.get).toHaveBeenCalledWith(
      'https://test.myrx.io/api/v1/smart-price/verify-user', 
      {"headers": {"x-prescryptive-device-token": "1111111"}}
    ); 
  })

  it ('calls getMemberInformation with valid parameters in test env', async () => {
    const result = {data: {memberId: '111111', rxGroup: 'rx', rxBin: 'bin', carrierPCN: 'pcn'}};  
    const deviceToken = '1111111';
    axios.get.mockImplementation(() => Promise.resolve(result));
    await expect(getMemberInformation(deviceToken, 'test')).resolves.toEqual(result.data);
    expect(axios.get).toHaveBeenCalledWith(
      'https://test.myrx.io/api/v1/smart-price/get-smartprice-member-info', 
      {"headers": {"x-prescryptive-device-token": "1111111"}}
    ); 
  })

  it ('calls getDeviceToken with valid parameters in test env', async () => {
    const phoneNumberMock = "1234567890";
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return '+1' + phoneNumberMock; 
    });
    const code = '123456';
    const result = {data: {deviceToken: '111111'}};  
    axios.post.mockImplementation(() => Promise.resolve(result));
    await expect(getDeviceToken(code, phoneNumberMock, 'test')).resolves.toEqual(result.data);
    expect(axios.post).toHaveBeenCalledWith(
      'https://test.myrx.io/api/v1/one-time-password/verify', {code: code, phoneNumber: "+11234567890"} 
    ); 
  })

  it ('calls registerAppUser with valid parameters in test env', async () => {
    const phoneNumberMock = "1234567890";
    const deviceTokenMock = '111111';
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return '+1' + phoneNumberMock; 
    });
    dateParser.getDateOfBirth.mockImplementationOnce(() => {
      return new Date("2000-08-22"); 
    });
    const form = {
      firstName: "John",
      lastName: "Perez",
      email: "jonh@email.com",
      dateOfBirth: "2000-08-22",
      phoneNumber: "1234567890",
    };
    const memberId = {data: 43211};
 
    axios.post.mockImplementation(() => Promise.resolve(memberId));
 
    await expect(registerAppUser(form, deviceTokenMock, 'test')).resolves.toEqual(memberId.data);
    expect(axios.post).toHaveBeenCalledWith(
      `https://test.myrx.io/api/v1/smart-price/app-register`, {...form, dateOfBirth: new Date("2000-08-22"), phoneNumber: '+1' + phoneNumberMock},
      {"headers": {"x-prescryptive-device-token": "111111"}}
    );
  })

  it('fetches erroneously data from an API', async () => {
    const phoneNumber = "1234567890";
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return '+1' + phoneNumber; 
    });
    dateParser.getDateOfBirth.mockImplementationOnce(() => {
      return new Date("2000-08-22"); 
    });
    const form = {
      firstName: "John",
      lastName: "Perez",
      email: "jonh@email.com",
      dateOfBirth: "2000-08-22",
      phoneNumber: "1234567890",
      verifyCode: '24122',
    };
    const errorMessage = {response: {data: 'Network Error'}};
 
    axios.post.mockImplementation(() =>
      Promise.reject(errorMessage),
    );
 
    await expect(registerUser(form)).rejects.toBe(errorMessage.response.data);
  });

  it('fetches null if no phone provided', () => {
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return null; 
    });
    dateParser.getDateOfBirth.mockImplementationOnce(() => {
      return new Date("2000-08-22"); 
    });
    const form = {
      firstName: "John",
      lastName: "Perez",
      email: "jonh@email.com",
      dateOfBirth: "2000-08-22",
      verifyCode: '24122',
    };
    expect(registerUser(form)).toEqual(null);
  });

  it('fetches null if no date of birth provided', () => {
    phoneParser.getPhoneNumber.mockImplementationOnce(() => {
      return null; 
    });
    dateParser.getDateOfBirth.mockImplementationOnce(() => {
      return null; 
    });
    const form = {
      firstName: "John",
      lastName: "Perez",
      email: "jonh@email.com",
      verifyCode: '24122',
    };
    expect(registerUser(form)).toEqual(null)
  });
});