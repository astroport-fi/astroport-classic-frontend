import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";

import CardHeader from "components/CardHeader";
import Card from "components/Card";
import SearchIcon from "components/icons/SearchIcon";
import Timer from "components/Timer";
import { useConfig } from "modules/airdrop";

const AstroAirdrop = () => {
  const config = useConfig();
  const [value, setValue] = useState("");

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const renderButton = () => {
    if (value.length == 0) {
      return (
        <Button as="a" variant="primary" width="192px" mt="6" isDisabled>
          Check
        </Button>
      );
    }

    return (
      <Link href={`/airdrop/${value}`} passHref>
        <Button as="a" variant="primary" width="192px" mt="6">
          Check
        </Button>
      </Link>
    );
  };

  return (
    <Box>
      <CardHeader label="ASTRO Airdrop" />
      <Card px={["6", null, null, "12"]} pt="12" pb="8">
        <Flex direction="column" align="center">
          <Box mb="10">
            <Timer start={config?.from_timestamp} end={config?.to_timestamp} />
          </Box>
          <Box px="5" flex="1">
            <Text fontWeight="500" fontSize="14px" mb="1">
              Check your eligibility:
            </Text>
            <Text textStyle="medium" variant="dimmed" mb="3">
              LUNA stakers and Terraswap LPs are eligible for an ASTRO airdrop.
              Please use the input field below to check which of your Terra
              addresses qualify for the airdrop.
            </Text>
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="white" opacity="0.4" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Paste your Terra address"
                  variant="filled"
                  value={value}
                  onChange={handleChange}
                />
              </InputGroup>
              {renderButton()}
            </Box>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default AstroAirdrop;
