/* eslint-disable prettier/prettier */
export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    phoneValidationApi: process.env.PHONE_VALIDATION_API,
    phoneValidationApiKey: process.env.PHONE_VALIDATION_API_KEY,
    emailValidationApi: process.env.EMAIL_VALIDATION_API,
    emailValidationApiKey: process.env.EMAIL_VALIDATION_API_KEY,
  };
};
