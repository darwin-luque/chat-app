const CHARSET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generatePassword(length = 8, charset = CHARSET): string {
  let result = '';
  const characters = charset.split('');
  if (length) {
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
  }
  return result;
}
