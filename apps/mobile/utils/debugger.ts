export function logger(value: unknown) {
  console.debug(new Date().toUTCString(), JSON.stringify(value, null, 2));
}
