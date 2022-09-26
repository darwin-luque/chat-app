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

export function areEqual(
  array1: Array<string | number | boolean>,
  array2: Array<string | number | boolean>
): boolean {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}
