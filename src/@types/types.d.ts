type EmailType = {
  type: "RESET_PASSWORD";
  params: {
    APP_URL: string;
    USER_EMAIL: string;
  };
};
