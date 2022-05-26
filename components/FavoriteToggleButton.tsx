import React, { FC } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { IconButton, FlexProps, Flex } from "@chakra-ui/react";

import { useTogglePoolToFavorite } from "modules/common";

import FavoriteIcon from "components/icons/FavoriteIcon";

type Props = {
  pool: string;
  mr?: string;
} & FlexProps;

const FavoriteToggleButton: FC<Props> = ({ pool, mr = "8", ...props }) => {
  const [favoritesPools, setFavoritesPools] = useLocalStorage<string[]>(
    "favoritesPools",
    []
  );

  const newFavoritePools = useTogglePoolToFavorite(pool, ...favoritesPools);
  const isSelected = favoritesPools.indexOf(pool) > -1;

  const handleClick = () => {
    setFavoritesPools(newFavoritePools);
  };

  return (
    <Flex {...props}>
      <IconButton
        aria-label="Mark as favorite"
        variant="simple"
        icon={
          <FavoriteIcon
            color="#59B7DD"
            w="4"
            h="4"
            mr={mr}
            isSelected={isSelected}
          />
        }
        onClick={handleClick}
      />
    </Flex>
  );
};

export default FavoriteToggleButton;
