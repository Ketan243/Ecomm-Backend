//validation
const Joi = require('@hapi/joi');

const registerVal = (data) => {
    const schema = {
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      phone: Joi.string().min(10).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    };
    return Joi.validate(data,schema);
}

const loginVal = (data)=>{
    const schema = {
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    }
    return Joi.validate(data,schema);
}

const productVal = (data) => {
  const schema = {
    product_name: Joi.string().required(),
    product_desc: Joi.string().required(),
    image: Joi.string().required(),
    price:Joi.string().required(),
    brand_name: Joi.string().required(),
    category: Joi.string().required(),
  };
  return Joi.validate(data,schema);
}

module.exports.registerVal = registerVal;
module.exports.loginVal = loginVal;
module.exports.productVal=productVal;

