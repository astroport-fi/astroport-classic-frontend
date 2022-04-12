import React, { FC } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { IconButton, Box } from "@chakra-ui/react";
import { useTogglePoolToFavorite } from "modules/common";
import FavoriteIcon from "components/icons/FavoriteIcon";

type Props = {
  pool: string;
};

const FavoriteToggleButton: FC<Props> = ({ pool }) => {
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
    <Box>
      <IconButton
        aria-label="Mark as favorite"
        variant="simple"
        icon={
          <FavoriteIcon
            color="#59B7DD"
            w="4"
            h="4"
            mr="8"
            isSelected={isSelected}
          />
        }
        onClick={handleClick}
      />
    </Box>
  );
};

export default FavoriteToggleButton;
