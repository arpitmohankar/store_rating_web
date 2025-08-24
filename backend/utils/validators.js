const validateEmail = (email)=>{
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
};

const validatePassword = (password) => {
    if (password.length<8 || password.length>16){return false;}
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasSpecialChar;
};
const validateName = (name) => {return name.length>=20 && name.length<=60;};
const validateAddress = (address) => {return address.length <= 400;};

module.exports = {validateEmail,
    validatePassword,
    validateName,
    validateAddress
};
