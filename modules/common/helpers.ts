import numeral from "numeral";
import { num } from "@arthuryeti/terra";
import { request } from "graphql-request";

export const handleBigPercentage = (
  value: string | number,
  format: string = "0,0a.00",
  numberSuffix: string = "%"
) => {
  if (num(value).gte(100000)) {
    return `> 100K${numberSuffix}`;
  }

  return `${
    numeral(value).format(format).toUpperCase() || (0).toFixed(2)
  }${numberSuffix}`;
};

export const handleBigAndTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeDollarSign: boolean = false,
  includeZero: boolean = false,
  numberPrefix: string = ""
) => {
  if (includeZero && num(value).eq(0)) {
    return `< ${includeDollarSign ? "$" : ""}${numberPrefix}0.01`;
  }

  if (num(value).lt(0.01) && num(value).gt(0)) {
    return `< ${includeDollarSign ? "$" : ""}${numberPrefix}0.01`;
  }

  if (num(value).gt(1000000)) {
    return `${includeDollarSign ? "$ " : ""}${numberPrefix}${numeral(value)
      .format("0.00a", Math.floor)
      .toUpperCase()}`;
  }

  return `${includeDollarSign ? "$ " : ""}${numberPrefix}${numeral(
    value
  ).format(format)}`;
};

export const handleTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeZero: boolean = false,
  numberPrefix: string = ""
) => {
  const bigNumValue = num(value);

  if (includeZero && bigNumValue.eq(0)) {
    return `< ${numberPrefix}0.01`;
  }

  // not so necessary but also can check if it's positive number -bignumValue.gt()
  if (bigNumValue.lt(0.01)) {
    return `< ${numberPrefix}0.01`;
  }

  return `${numberPrefix}${numeral(value).format(format)}`;
};

export const handleDollarTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeZero: boolean = false
) => {
  return handleTinyAmount(value, format, includeZero, "$ ");
};

export const handleAmountWithoutTrailingZeros = (
  value: number,
  significantDigits: number = 2
) => {
  return parseFloat(value.toFixed(significantDigits));
};

export const isObject = (value: any) => {
  return typeof value === "object";
};

export const requestInChunks = async <Item = any, Response = any>(
  chunkSize: number,
  url: string,
  items: Item[],
  queryBuilder: (chunk: Item[]) => string
): Promise<Response> => {
  const totalChunks = Math.ceil(items.length / chunkSize);

  const chunks = await Promise.all(
    Array.from(Array(totalChunks).keys()).map((i) => {
      const chunk = items.slice(i * chunkSize, (i + 1) * chunkSize);

      return request<Response>(url, queryBuilder(chunk));
    })
  );

  return chunks.reduce((all, chunk) => ({ ...all, ...chunk }));
};

export const truncateStr = (str: string, length: number) => {
  if (str?.length > length) {
    return str.substring(0, length).trim() + "...";
  }

  return str;
};

export const validateJsonInput = (json: string): Boolean => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }

  return true;
};
