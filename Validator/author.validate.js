const Joi = require("joi");

exports.authorValidator = function (data) {
  try {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(15).required(),
      date_of_birth: Joi.string().min(2).max(4).required(),
      date_of_death: Joi.string().min(2).max(4).required(),
      country: Joi.string().required(),
      bio: Joi.string().min(5).max(100).required(),
      works: Joi.string().min(6).max(400).required(),
    });
    return schema.validate(data);
  } catch (error) {
    res.json(details[0].message);
  }
};
