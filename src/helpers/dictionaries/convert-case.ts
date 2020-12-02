import { TextCase } from '@/constants/enums';

export const convertCaseDictionary: { [key: string]: Function } = {
  [`${TextCase.SNAKE} / ${TextCase.CAMEL}`]: (s: string) =>
    s.replace(/_\w/g, (m) => m[1].toUpperCase()),

  [`${TextCase.CAMEL} / ${TextCase.SNAKE}`]: (s: string) =>
    s.replace(/[A-Z]/g, (m: string) => `_${m}`).toLowerCase(),

  [`${TextCase.CAMEL} / ${TextCase.KEBAB}`]: (s: string) =>
    s.replace(/[A-Z]/g, (m: string) => `-${m}`).toLowerCase(),

  [`${TextCase.MACRO} / ${TextCase.CAMEL}`]: (s: string) =>
    s.toLowerCase().replace(/_\w/g, (m: string) => m[1].toUpperCase()),

  [`${TextCase.MACRO} / ${TextCase.KEBAB}`]: (s: string) =>
    s.toLowerCase().replace(/_\w/g, (m: string) => `-${m[1]}`),

  [`${TextCase.PASCAL} / ${TextCase.KEBAB}`]: (s: string) =>
    s.replace(/[A-Z]/g, (m: string, offset) => (offset > 0 ? `-${m}` : m)).toLowerCase(),
};
