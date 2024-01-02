export function generateResetPasswordCode() {
  return (Math.random() + 1).toString(36).substring(2, 8).toUpperCase();
}
