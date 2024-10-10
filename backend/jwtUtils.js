const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secretKey = 'workshopEPSI'; 
  const options = {
    expiresIn: '1h', 
  };

  const token = jwt.sign(payload, secretKey, {});
  return token;
};

module.exports = {
  generateToken,
};