import React, { FC } from "react";
import { Text, HStack, Button } from "@chakra-ui/react";

import PaginationNext from "components/icons/PaginationNextIcon";
import PaginationPrev from "components/icons/PaginationPrevIcon";

type Props = {
  pageIndex: number;
  PageLength: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
};

const PoolTotalTd: FC<Props> = ({
  pageIndex,
  PageLength,
  canPreviousPage,
  canNextPage,
  onClickPrev,
  onClickNext,
}) => {
  return (
    <HStack justify="center" py="4">
      <Button
        variant="simple"
        onClick={() => onClickPrev()}
        disabled={!canPreviousPage}
        aria-label="Go to previous page"
      >
        <PaginationPrev color="brand.purple" />
      </Button>
      <Text variant="dimmed" fontSize="sm" pt="2px">
        Page {pageIndex + 1} of {PageLength}
      </Text>

      <Button
        variant="simple"
        onClick={() => onClickNext()}
        disabled={!canNextPage}
        aria-label="Go to next page"
      >
        <PaginationNext color="brand.purple" />
      </Button>
    </HStack>
  );
};

export default PoolTotalTd;
