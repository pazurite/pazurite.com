import { TextCase } from '@/constants/enums';

import { convertCaseDictionary } from '@/helpers/dictionaries/convert-case';

export type ConvertCaseOptions = {
  from: TextCase;
  to: TextCase;
};

export const textCaseConverter = (input: string, options: ConvertCaseOptions): string => {
  if (!input) return '';

  let convertFn = convertCaseDictionary[`${options.from} / ${options.to}`];

  return !convertFn ? input : convertFn(input);
};
