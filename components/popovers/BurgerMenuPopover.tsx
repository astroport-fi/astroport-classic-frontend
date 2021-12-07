import React, { FC } from "react";
import {
  Box,
  Link,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";

type Props = {
  triggerElement: React.ReactElement;
};

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

const BurgerMenuPopover: FC<Props> = ({ triggerElement }) => {
  return (
    <Popover placement="left" offset={[200, 0]}>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Menu</PopoverHeader>
        <PopoverBody>
          <Box width="3xs">
            <List color="brand.deepBlue">
              {items.map(({ label, url }, index) => (
                <ListItem
                  key={label}
                  borderBlockStart={index === 0 ? "1px" : "0px"}
                  borderBlockEnd="1px"
                  borderColor="black.200"
                  px="6"
                  py="3"
                >
                  <Link fontSize="12px" href={url} isExternal>
                    {label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BurgerMenuPopover;
