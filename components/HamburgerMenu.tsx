import React, { FC } from "react";

import {
  Box,
  Heading,
  IconButton,
  Link,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import CloseIcon from "components/icons/CloseIcon";

type Props = {};

const items = [
  { label: "About", url: "https://astroport.fi/" },
  { label: "Docs", url: "https://docs.astroport.fi/" },
  { label: "Code", url: "https://github.com/astroport-fi/astroport" },
  { label: "Discord", url: "https://discord.gg/astroport" },
  { label: "Medium", url: "https://astroport.medium.com/" },
  {
    label: "Terms & Privacy Policy",
    url: "https://astroport.fi/terms-and-conditions",
  },
];

const HamburgerMenu: FC<Props> = ({}) => (
  <Menu>
    {({ onClose }) => (
      <>
        <MenuButton color="white">
          <HamburgerIcon />
        </MenuButton>

        <MenuList bg="otherColours.overlay" color="brand.deepBlue">
          <Flex p={6} justify="space-between" align="center">
            <Heading>Menu</Heading>
            <IconButton
              aria-label="Close"
              variant="icon"
              size="xs"
              isRound
              color="currentColor"
              borderColor="currentColor"
              _hover={{
                bg: "brand.purple",
                color: "white",
                borderColor: "brand.deepBlue",
              }}
              _active={{
                bg: "brand.purple",
                color: "white",
                borderColor: "brand.deepBlue",
              }}
              icon={<CloseIcon />}
              onClick={onClose}
            />
          </Flex>
          <Box pb={4}>
            <Divider borderColor="black.100" />
            {items.map(({ label, url }) => (
              <>
                <Link
                  href={url}
                  isExternal
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Text px={6} py={1}>
                    {label}
                  </Text>
                </Link>
                <Divider borderColor="black.100" />
              </>
            ))}
          </Box>
        </MenuList>
      </>
    )}
  </Menu>
);

export default HamburgerMenu;
