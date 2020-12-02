export default function excludeProps(excludeValues = [], defaultValue) {
  if (!Array.isArray(excludeValues)) {
    throw new Error("Exclude props only accepts array argument!");
  }

  if (defaultValue && excludeValues.includes(defaultValue))
    throw new Error(`Exclude props contain provided defaultValue`);

  if (excludeValues.some((v) => !(typeof v === "string" || typeof v === "number")))
    throw new Error("Enum props should only be String or Number");

  return {
    type: [String, Number],
    default: defaultValue,
    validator: (v) => !excludeValues.includes(v),
  };
}
