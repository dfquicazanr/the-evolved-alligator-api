export const setCharAt = (str, index, chr): string => {
  return str.substring(0, index) + chr + str.substring(index + 1);
}