// Copyright 2021 Prescryptive Health Inc

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const nameRegex = /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/;
const tenDigitsRegex = /([0-9]{10})/g;
const dateRegex = /\d{4}\-\d{2}-\d{2}/g;

export const getAttributesData = el => {
  if (el === undefined || el.hasOwnProperty('getAttribute')){
    return {error: 'not element'};
  }
  const firstName = el.getAttribute("data-firstname");
  const lastName = el.getAttribute("data-lastname");
  const email = el.getAttribute("data-email");
  const phone = el.getAttribute("data-phone");
  const dateOfBirth = el.getAttribute("data-dob");

  const fn = firstName ? firstName.match(nameRegex) : "";
  const ln = lastName ? lastName.match(nameRegex) : "";
  const em = email ? email.match(emailRegex) : "";
  const ph = phone ? phone.match(tenDigitsRegex) : "";
  const dob = dateOfBirth ? dateOfBirth.match(dateRegex) : "";
  
  return {fn,ln,em,ph,dob}
}

export const checkFormData = (firstName, lastName, email, phone, dateOfBirth) => {
  const fn = firstName ? firstName.match(nameRegex) ? firstName: "" : "";
  const ln = lastName ? lastName.match(nameRegex) ? lastName: "" : "";
  const em = email ? email.match(emailRegex) ? email: "" : "";
  const ph = phone ? phone.match(tenDigitsRegex) ? phone: "" : "";
  const dob = dateOfBirth ? dateOfBirth.match(dateRegex) ? dateOfBirth: "" : "";
  
  return {fn,ln,em,ph,dob}
}

export const buildFormQuery = (firstName, lastName, email, phone, dateOfBirth, MODAL_URL) => {
  const fn = firstName ? `?fn=${firstName}` : '';
  const ln = lastName ? `&ln=${lastName}` : '';
  const em = email ? `&em=${email}` : '';
  const ph = phone ? `&ph=${phone}` : '';
  const dob = dateOfBirth ? `&dob=${dateOfBirth}` : '';
  const url = MODAL_URL ? MODAL_URL : '';
  return `${url}/${fn}${ln}${em}${ph}${dob}`;
}