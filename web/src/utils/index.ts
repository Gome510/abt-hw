export function isEmptyObj(obj: object) {
  for (const _prop in obj) return false;
  return true;
}
