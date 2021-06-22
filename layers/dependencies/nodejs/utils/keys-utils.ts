import { v4 as uuidv4 } from 'uuid';
import {setCharAt} from "./string-utils";

const numericCharacters = '0123456789';
const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
const alphaNumericCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const randomToken = (): string => uuidv4();

export const randomAlphaNumericString = (length) => {
  let result = '';
  for (let i = length; i > 0; --i)
    result += alphaNumericCharacters[Math.floor(Math.random() * alphaNumericCharacters.length)];
  return result;
}

export const randomAlphaNumericStringForcedAlphaNumeric = (length) => {
  let result = randomAlphaNumericString(length)
  result = setCharAt(result, Math.floor(Math.random() * length), numericCharacters[Math.floor(Math.random() * numericCharacters.length)]);
  result = setCharAt(result, Math.floor(Math.random() * length), lowercaseCharacters[Math.floor(Math.random() * lowercaseCharacters.length)]);
  return result;
}

export const itemKey = (prefix: string) => `${prefix}-${uuidv4()}`;

export const dateKey = (prefix: string, date: Date) => `${prefix}-${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;
