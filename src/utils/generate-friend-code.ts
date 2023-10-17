export function generateFriendCode() {
  return (Math.random() + 1).toString(36).substring(2, 9).toUpperCase();
}
