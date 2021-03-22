// Copyright 2021 Prescryptive Health Inc
import { checkFormData, getAttributesData, buildFormQuery } from './formData';

describe('checkFormData', () => {

  it('returns empty fields if empty params', () => {
    expect(checkFormData("", "", "", "", "")).toEqual({dob:"", ln:"", fn:"", ph:"", em:""});
  })

  it('returns only correct fields', () => {
    const fn = "John";
    const ln = "Smith";
    const ph = "12";
    const em = "mail";
    const dob = "date";
    expect(checkFormData(fn, ln, em, ph, dob)).toEqual({fn, ln, ph:"", em: "", dob: ""});
  })
});

describe('getAttributesData', () => {
  it('returns empty if no data', () => {
    expect(getAttributesData(undefined)).toEqual({error: 'not element'});
  })
});

describe('buildFormQuery', () => {
  it('returns expected string with correct params', () => {
    const fn = "John";
    const ln = "Smith";
    const ph = "12";
    const em = "mail";
    const dob = "date";
    const url = "http://sample"
    expect(buildFormQuery(fn, ln, em, ph, dob, url)).toEqual(`${url}/?fn=${fn}&ln=${ln}&em=${em}&ph=${ph}&dob=${dob}`);
  })

  it('returns expected string without params', () => {
    const url = "http://sample"
    expect(buildFormQuery(undefined, undefined, undefined, "", "", url)).toEqual(url + '/');
  })

  it('returns expected string without some params', () => {
    const fn = "John";
    const ln = "Smith";
    const ph = "12";
    expect(buildFormQuery(fn, ln, undefined, ph, undefined, undefined)).toEqual(`/?fn=${fn}&ln=${ln}&ph=${ph}`);
  })
});