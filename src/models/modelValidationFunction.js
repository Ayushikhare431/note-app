const getnotNullValidationMsg = (model, field) => {
    return `${model} ${field} should not be null.`;
  };
  
  const getnotEmptyValidationMsg = (model, field) => {
    return `${model} ${field} should not be empty.`;
  };
  
  const getUniqueVlidationMsg = (model, field) => {
    return `${model} ${field} already exist.`;
  };
  
  const getisIntValidationMsg = (model, field) => {
    return `${model} ${field} should be a integer.`;
  };
  
  const getLengthValidationMsg = (model, field, limit) => {
    return `${model} ${field} should be less than ${limit} characters long.`;
  };
  
  const isBooleanValidationMsg = (val, model, field) => {
    if (typeof val != "boolean")
      throw new Error(`${model} ${field} should be true or false.`);
  };
  
  const isStringValidationMsg = (val, model, field) => {
    if (typeof val != "string")
      throw new Error(`${model} ${field} should be a string.`);
  };
  
  const getisDecimalValidationMsg = (model, field) => {
    return `${model} ${field} should be a number.`;
  };
  
  const getMaxMinNumberValidationMsg = (model, field) => {
    return `${model} ${field} should be valid.`;
  };
  
  const getisDateValidationMsg = (model, field) => {
    return `${model} ${field} should be a valid date.`;
  };
  
  module.exports = {
    getnotNullValidationMsg,
    getisIntValidationMsg,
    isBooleanValidationMsg,
    getnotEmptyValidationMsg,
    getUniqueVlidationMsg,
    getLengthValidationMsg,
    getisDecimalValidationMsg,
    getMaxMinNumberValidationMsg,
    getisDateValidationMsg,
    isStringValidationMsg
  };
  