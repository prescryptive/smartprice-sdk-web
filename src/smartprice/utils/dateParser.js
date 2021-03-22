// Copyright 2021 Prescryptive Health Inc
const maxAge = 65;
const minAge = 18;
function dateOfBirth(dateOfBirthText) {
  if (isNaN(Date.parse(dateOfBirthText))){
    return null;
  }
  const dob = new Date(Date.parse((dateOfBirthText || "").trim()));
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const minDateOfBirth = new Date(year - minAge, month, date);
  const maxDateOfBirth = new Date(year - maxAge, month, date);
  if (dob > minDateOfBirth || dob < maxDateOfBirth) {
    return null;
  }
  return dob;
}

function getDateOfBirth(dateOfBirthText) {
  return dateOfBirth(dateOfBirthText);
}
module.exports = {getDateOfBirth};