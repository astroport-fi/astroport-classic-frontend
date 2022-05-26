import { TxInfo } from "@terra-money/terra.js";
import num from "libs/num";
import numeral from "numeral";
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
    return `< ${numberPrefix}0.01${includeDollarSign ? " UST" : ""}`;
  }

  if (num(value).lt(0.01) && num(value).gt(0)) {
    return `< ${numberPrefix}0.01${includeDollarSign ? " UST" : ""}`;
  }

  if (num(value).gt(1000000)) {
    return `${numberPrefix}${numeral(value)
      .format("0.00a", Math.floor)
      .toUpperCase()}${includeDollarSign ? " UST" : ""}`;
  }

  return `${numberPrefix}${numeral(value).format(format)}${
    includeDollarSign ? " UST " : ""
  }`;
};

export const handleTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeZero: boolean = false,
  numberPrefix: string = ""
) => {
  const bigNumValue = num(value);

  if (includeZero && bigNumValue.eq(0)) {
    return `< 0.01${numberPrefix}`;
  }

  // not so necessary but also can check if it's positive number -bignumValue.gt()
  if (bigNumValue.lt(0.01)) {
    return `< 0.01${numberPrefix}`;
  }

  return `${numeral(value).format(format)}${numberPrefix}`;
};

export const handleDollarTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeZero: boolean = false
) => {
  return handleTinyAmount(value, format, includeZero, " UST");
};

export const handleAmountWithoutTrailingZeros = (
  value: number,
  significantDigits: number = 2
) => {
  return parseFloat(value.toFixed(significantDigits));
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

export const getEventsByType = (txInfo: TxInfo, index: number = 0): any => {
  if (!txInfo) {
    return null;
  }

  if (txInfo.logs && index < 0) {
    index = txInfo.logs.length - index * -1;
  }

  if (!txInfo.logs || txInfo.logs.length <= index || !txInfo.logs[index]) {
    return null;
  }

  return txInfo.logs[index]?.eventsByType;
};

export const partition = (array: any, isValid: any) => {
  return array.reduce(
    ([pass, fail]: [any, any], elem: any) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
};

export const searchTokenAdddres = (search: string, pools: any[]): any[] => {
  return pools.filter((row: any) => {
    const query = search.toLowerCase();
    const assets = row.sortingAssets;

    if (!assets) {
      return true;
    }

    for (const asset of assets) {
      const string = asset ? String(asset).toLowerCase() : "";

      // If the sortingAsset string looks like an address (starts with "terra"),
      // then the query must begin with "terra" and also match. If the sortingAsset string
      // does not look like an address (e.g. a symbol), then any query can match.
      // This allows the search to be useful when the query is short (e.g. 1 character),
      // otherwise it'd match lots of pools by address.
      if (
        (!string.startsWith("terra") || query.startsWith("terra")) &&
        string.includes(query)
      ) {
        return true;
      }
    }

    return false;
  });
};

export const toggleValueInArray = (value: any, array: any[]) => {
  const newArray = [...array];
  const valueIndex = array.indexOf(value);
  if (valueIndex > -1) {
    newArray.splice(valueIndex, 1);
  } else {
    newArray.push(value);
  }
  return newArray;
};
