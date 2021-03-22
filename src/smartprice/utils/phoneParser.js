function getPhoneNumber(tenDigitPhoneNumber) {
    const phoneText = `+1${(tenDigitPhoneNumber || "").trim().replace(/[^\d]/gi, "")}`;
    if (phoneText.length !== 12) {
      return null;
    }
    return phoneText;
};
module.exports = {getPhoneNumber};  