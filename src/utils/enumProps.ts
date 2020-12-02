export default function enumProps(allowedValues, defaultValue) {
  if (!Array.isArray(allowedValues)) throw new Error('Enum props only accepts array argument!');

  if (!!defaultValue && !allowedValues.includes(defaultValue))
    throw new Error(`Enum props doesn't contain provided defaultValue`);

  if (allowedValues.some(v => !(typeof v === 'string' || typeof v === 'number')))
    throw new Error('Enum props should only be String or Number');

  return {
    type: [String, Number],
    default: defaultValue
  };
}
