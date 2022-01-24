import React from "react";
import { Icon } from "@chakra-ui/react";

export default function PaginationNext(props: any) {
  return (
    <Icon viewBox="0 0 16 16" w="6" h="6" {...props}>
      <path
        fillRule="evenodd"
        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
        fill="currentColor"
      />
    </Icon>
  );
}
