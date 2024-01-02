type EmailType = {
  type: "RESET_PASSWORD";
  params: {
    RESET_PASSWORD_CODE: string;
    USER_EMAIL: string;
  };
};
