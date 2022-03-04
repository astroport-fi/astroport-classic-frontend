import React, { FC, useEffect, useState } from "react";
import { Grid, Box, Flex, Text, Select, Input } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

import ArrowRight from "components/icons/ArrowRight";
import Card from "components/governance/Card";
import { GovernanceProposal } from "types/common";
import { filterIntegers } from "modules/common";

const DEFAULT_ITEMS_PER_PAGE = 4;

type Props = {
  proposals: GovernanceProposal[];
};

const GovProposalDash: FC<Props> = ({ proposals }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [inputPageNum, setInputPageNum] = useState<number | string>("");
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(proposals.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(proposals.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % proposals.length;
    setItemOffset(newOffset);
    setPageNum(event.selected + 1);
  };

  const goToPage = (page: number) => {
    const newOffset = ((page - 1) * itemsPerPage) % proposals.length;
    setItemOffset(newOffset);
    setPageNum(page);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const digitsOnly = value.replace(/\D/g, "");

    if (
      digitsOnly.length > 0 &&
      Number(digitsOnly) > 0 &&
      Number(digitsOnly) <= pageCount
    ) {
      goToPage(Number(digitsOnly));
    }

    setInputPageNum(digitsOnly);
  };

  return (
    <>
      <Grid templateColumns={["auto", "auto", "auto", "auto auto"]} gap={8}>
        {currentItems &&
          currentItems.map((item: GovernanceProposal, i: React.Key) => (
            <Card key={i} proposal={item} />
          ))}
      </Grid>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        py="8"
        borderBottomWidth="1px"
        borderBottomColor="white.200"
        fontSize="sm"
        color="white.400"
      >
        <Flex w="230px" ml="4" color="proposalColours.purpleAlt">
          Page {pageNum} of {pageCount}
        </Flex>
        <ReactPaginate
          nextLabel={
            <Box ml="2">
              <ArrowRight />
            </Box>
          }
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={<> </>}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="pagination-active"
          forcePage={pageNum - 1}
        />
        <Flex w="230px" mr="4" align="center">
          <Text mr="2">show</Text>
          <Select
            onChange={(e) => {
              console.log("ww");
              setItemsPerPage(parseInt(e.target.value));
              goToPage(1);
            }}
            w="100px"
            size="xs"
            borderRadius="md"
          >
            <option value={4}>4 items</option>
            <option value={2}>2 items</option>
          </Select>
          <Text ml="4" w="50px">
            Go to
          </Text>
          <Input
            pattern="[0-9]*"
            w="40px"
            h="25px"
            fontSize="sm"
            p="2"
            textAlign="center"
            value={inputPageNum}
            onChange={(e) => handleChange(e)}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default GovProposalDash;
