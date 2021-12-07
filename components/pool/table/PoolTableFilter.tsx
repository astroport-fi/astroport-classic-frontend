import React, { FC } from "react";
import Search from "components/common/Search";

type Props = {
  state: { globalFilter: any };
  setGlobalFilter: any;
};

const PoolTableFilter: FC<Props> = ({
  state: { globalFilter },
  setGlobalFilter,
}) => {
  return (
    <Search
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      placeholder="Search Token or Address"
      containerStyle={{ background: "black.200", color: "white.200" }}
      borderColor="white.200"
    />
  );
};

export default PoolTableFilter;
