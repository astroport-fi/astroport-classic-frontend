import { RequestDocument, Variables } from "graphql-request/dist/types";
import { fetchMantle } from "libs/graphql";
import { parseResult } from "libs/parse";
import alias from "libs/alias";

/* native */
export const getNativeQuery = async <T extends unknown>(params: {
  url: string;
  document: RequestDocument;
  variables?: Variables;
}) => {
  const { url, document, variables } = params;
  const response = await fetchMantle(url, document, variables);
  const { data } = await response.json();
  return data as T;
};

type Data = {
  url: string;
  name: string;
  contract: string;
  msg: object;
};

export const getContractQuery = async <T extends unknown>({
  name,
  contract,
  msg,
  url,
}: Data) => {
  const document = alias(
    [
      {
        name,
        contract,
        msg,
      },
    ],
    name
  );

  const response = await fetchMantle(url, document);
  const { data: result } = await response.json();

  return parseResult(result[name]) as T;
};

export default getContractQuery;
