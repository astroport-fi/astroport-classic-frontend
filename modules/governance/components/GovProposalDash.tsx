import React, { FC, useEffect, useState } from "react";
import { Grid, Box, Flex, Text, Input, useMediaQuery } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import ArrowLeft from "components/icons/ArrowLeft";
import ArrowRight from "components/icons/ArrowRight";
import Card from "components/governance/Card";
import { Proposal } from "types/common";
import { useConfig } from "modules/governance";

import FeedProposal from "components/feed/FeedProposal";

const ITEMS_PER_PAGE = 4;

type Props = {
  proposals: Proposal[];
};

const MobileComponent: FC<{
  proposals: Proposal[];
  quorum: string | undefined;
}> = ({ proposals, quorum }) => {
  return <FeedProposal proposals={proposals} quorum={quorum} />;
};

const Component: FC<{ proposals: Proposal[]; quorum: string | undefined }> = ({
  proposals,
  quorum,
}) => {
  const [currentItems, setCurrentItems] = useState<Proposal[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [inputPageNum, setInputPageNum] = useState<number | string>("");

  useEffect(() => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(proposals.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(proposals.length / ITEMS_PER_PAGE));
  }, [itemOffset, ITEMS_PER_PAGE]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % proposals.length;
    setItemOffset(newOffset);
    setPageNum(event.selected + 1);
  };

  const goToPage = (page: number) => {
    const newOffset = ((page - 1) * ITEMS_PER_PAGE) % proposals.length;
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

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const digitsOnly = value.replace(/\D/g, "");

    // ignore
    if (digitsOnly.length === 0) {
      goToPage(pageNum);
      setInputPageNum(pageNum);
      return;
    }

    if (Number(digitsOnly) === 0) {
      goToPage(1);
      setInputPageNum(1);
    } else if (Number(digitsOnly) > pageCount) {
      goToPage(pageCount);
      setInputPageNum(pageCount);
    }
  };

  return (
    <>
      <Grid
        templateColumns={["auto", "auto", "auto", "repeat(2, 1fr)"]}
        gap={8}
      >
        {currentItems.map((item: Proposal, i: React.Key) => (
          <Card key={i} proposal={item} quorum={quorum} />
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
        <Flex w="130px" ml="4" color="proposalColours.purpleAlt">
          Page {pageNum} of {pageCount}
        </Flex>
        <ReactPaginate
          previousLabel={
            <Box mr="2">
              <ArrowLeft />
            </Box>
          }
          nextLabel={
            <Box ml="2">
              <ArrowRight />
            </Box>
          }
          onPageChange={handlePageClick}
          pageCount={pageCount}
          renderOnZeroPageCount={() => null}
          containerClassName="pagination"
          activeClassName="pagination-active"
          forcePage={pageNum - 1}
        />
        <Flex w="130px" mr="4" align="center" justifyContent="flex-end">
          <Text mr="3" color="white.600">
            Go to
          </Text>
          <Input
            pattern="[0-9]*"
            w="40px"
            h="25px"
            fontSize="sm"
            p="2"
            textAlign="center"
            borderColor="white.200"
            placeholder="1"
            _placeholder={{ color: "whiteAlpha.300" }}
            value={inputPageNum}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
        </Flex>
      </Flex>
    </>
  );
};

const GovProposalDash: FC<Props> = ({ proposals }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const quorum = useConfig()?.proposal_required_quorum;

  return isMobile ? (
    <MobileComponent proposals={proposals} quorum={quorum} />
  ) : (
    <Component proposals={proposals} quorum={quorum} />
  );
};

export default GovProposalDash;
