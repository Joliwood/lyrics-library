function getIndexFromEnumValue(
  enumType: { [x: string]: any },
  enumValue: string | number,
) {
  const indexOfS = Object.values(enumType).indexOf(enumValue as unknown as typeof enumType);
  const key = Object.keys(enumType)[indexOfS];

  return key;
}

export default getIndexFromEnumValue;
