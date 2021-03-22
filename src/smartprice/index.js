// Copyright 2021 Prescryptive Health Inc
import 'iframe-lightbox/js/iframe-lightbox';
import 'iframe-lightbox/css/iframe-lightbox.css';
import './css/main.css';
import axios from 'axios';
import dateParser from './utils/dateParser';
import phoneParser from './utils/phoneParser';
import { checkFormData, getAttributesData, buildFormQuery } from './utils/formData';

const API_URL = "https://myrx.io/api/v1";
const TEST_API_URL = "https://test.myrx.io/api/v1";
const MODAL_URL = `https://test.smartprice.myrx.io/sdk-modal`;

export const registerPopupIframe = () =>{
    [].forEach.call(document.getElementsByClassName("iframe-lightbox-link"), function (el) {
    el.lightbox = new IframeLightbox(el);
    });
}

/**
 * Registers the SmartPRICE button to call the modal
 * @param {string} firstName to fill the field in form
 * @param {string} lastName to fill the field in form
 * @param {string} email to fill the field in form
 * @param {string} phone to fill the field form (10 digits)
 * @param {string} dateOfBirth to fill the field form with format (YYYY-MM-DD)
 */
export const init = (firstName, lastName, email, phone, dateOfBirth) => {

  [].forEach.call(document.getElementsByClassName('smartprice-button'), function (buttonContainer) {

    const dataInit = checkFormData(firstName, lastName, email, phone, dateOfBirth);
    const dataAttributes = getAttributesData(buttonContainer);

    const fn = dataAttributes.fn ? dataAttributes.fn : dataInit.fn;
    const ln = dataAttributes.ln ? dataAttributes.ln : dataInit.ln;
    const em = dataAttributes.em ? dataAttributes.em : dataInit.em;
    const ph = dataAttributes.ph ? dataAttributes.ph : dataInit.ph;
    const dob = dataAttributes.dob ? dataAttributes.dob : dataInit.dob;

    const endpoint = buildFormQuery(fn, ln, em, ph, dob, MODAL_URL);

    const button = document.createElement('a');
    button.className = "iframe-lightbox-link";
    button.innerText = 'Save with SmartPRICE™'
    button.setAttribute('style', 'color:transparent; width: 100%; height:100%; display:flex;');
    button.setAttribute('data-scrolling', "true");
    button.setAttribute('href', endpoint);
    buttonContainer.appendChild(button);
    });
  
    registerPopupIframe();
}

export const registerUser = (form, env='prod') => {
    let url = env === 'test' ? TEST_API_URL : API_URL;
    let dob = dateParser.getDateOfBirth(form.dateOfBirth);
    let phone = phoneParser.getPhoneNumber(form.phoneNumber);
    if (!dob || !phone) return null;
    return new Promise((resolve, reject) => {
        axios
        .post(`${url}/smart-price/register`, {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            dateOfBirth: dob,
            phoneNumber: phone,
            verifyCode: form.verifyCode,
        })
        .then((resp) => {
            resolve(resp.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
};

export const sendVerificationCode = (number, env='prod') => {
  let url = env === 'test' ? TEST_API_URL : API_URL;
  let phoneNumber = phoneParser.getPhoneNumber(number);
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/one-time-password/send`, {
        phoneNumber,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.details.errors);
      });
  });
};

export const isRegisteredUser = (deviceToken, env='prod') => {
  let url = env === 'test' ? TEST_API_URL : API_URL;
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/smart-price/verify-user`, {
        headers: {
          "x-prescryptive-device-token": deviceToken
        }
      })      
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.details.errors);
      });
  });
};

export const getMemberInformation = (deviceToken, env='prod') => {
  let url = env === 'test' ? TEST_API_URL : API_URL;
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/smart-price/get-smartprice-member-info`, {
        headers: {
          "x-prescryptive-device-token": deviceToken
        }
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.details.errors);
      });
  });
}

export const getDeviceToken = (code, number, env='prod') => {
  let url = env === 'test' ? TEST_API_URL : API_URL;
  let phoneNumber = phoneParser.getPhoneNumber(number);
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/one-time-password/verify`, {
        code,
        phoneNumber,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.details.errors);
      });
  });
}

export const registerAppUser = (form, deviceToken, env='prod') => {
  let url = env === 'test' ? TEST_API_URL : API_URL;
  let dob = dateParser.getDateOfBirth(form.dateOfBirth);
  let phone = phoneParser.getPhoneNumber(form.phoneNumber);
  if (!dob || !phone) return null;
  return new Promise((resolve, reject) => {
      axios
      .post(`${url}/smart-price/app-register`, 
      {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          dateOfBirth: dob,
          phoneNumber: phone,
      },{
        headers: {
          "x-prescryptive-device-token": deviceToken
        }
      })
      .then((resp) => {
          resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};