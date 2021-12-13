import React, { FC, useState } from "react";
import {
  chakra,
  Box,
  Link,
  Flex,
  VStack,
  Text,
  IconButton,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";

type Props = {
  onCloseClick: () => void;
  onConfirmClick: () => void;
};

const MotionBox = motion(Box);

const AstroportDisclaimer: FC<Props> = ({ onCloseClick, onConfirmClick }) => {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      w="470px"
      m="0 auto"
      mt="10"
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <Text fontSize="lg" color="red.500">
            Disclaimer
          </Text>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            size="xs"
            isRound
            onClick={onCloseClick}
          />
        </Flex>

        <Text fontSize="sm" mt="6">
          <chakra.span opacity={0.6}>
            Please check the boxes below to confirm your agreement to the{" "}
          </chakra.span>
          <Link
            href="https://astroport.fi/terms-and-conditions"
            color="brand.lightPurple"
            isExternal
          >
            Astroport Terms and Conditions
          </Link>
        </Text>

        <VStack mt="8" pl="4" spacing="6">
          <Checkbox
            colorScheme="green"
            alignItems="flex-start"
            pt="2"
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[1]])
            }
          >
            <Text fontSize="sm" ml="4" fontWeight="medium">
              I have read and understood, and do hereby agree to be legally
              bound as a ‘User’ under, the Terms, including all future
              amendments thereto. Such agreement is irrevocable and will apply
              to all of my uses of the Site without me providing confirmation in
              each specific instance.
            </Text>
          </Checkbox>
          <Checkbox
            colorScheme="green"
            alignItems="flex-start"
            pt="2"
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
            <Text fontSize="sm" ml="4" fontWeight="medium">
              I acknowledge and agree that the Site solely provides information
              about data on the Terra blockchain. I accept that the Site
              operators have no custody over my funds, ability or duty to
              transact on my behalf or power to reverse my transactions. The
              Site operators do not endorse or provide any warranty with respect
              to any tokens.
            </Text>
          </Checkbox>
        </VStack>

        <Flex flexDir="column" align="center" mt="8" mb="4">
          <Button
            variant="primary"
            minW="64"
            size="sm"
            type="submit"
            isDisabled={!allChecked}
            onClick={onConfirmClick}
          >
            Confirm
          </Button>
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default AstroportDisclaimer;
