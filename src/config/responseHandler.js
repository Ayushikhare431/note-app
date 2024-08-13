const responseHandler = {
    successResponse: (data) => {
      return {
        status: 'success',
        data: data,
      };
    },
  
    validationResponse: (err) => {
      return {
        status: 'error',
        message: 'Validation error',
        errors: err,
      };
    },
  
    notFoundResponse: (err) => {
      return {
        status: 'error',
        message: 'Not found',
        errors: err,
      };
    },
  };
  
  module.exports = responseHandler;