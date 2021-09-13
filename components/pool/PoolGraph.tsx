import React,
{
  useEffect,
  useMemo,
  useState,
  FC,
  ButtonHTMLAttributes,
  ReactNode
}  from "react";
import Card from "components/Card";
import Graph from "components/graph/Graph";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { lookupSymbol } from "libs/parse";
import { useTokenInfo, formatAmount } from "@arthuryeti/terra";
import { useTokenPrice } from "modules/swap";
import {enumToArray, findRegularToken, preparingSelectList } from "modules/pool";

enum TypeFilter {
  Log,
  Lin,
}

enum TimeFilter {
  FiveMinutes,
  FifteenMinutes ,
  ThirteenMinutes,
  OneHour,
  FourHours,
  OneDay,
  OneWeek,
}

const buttonTitleByTypeFilters: Record<TypeFilter, string> = {
  [TypeFilter.Log]: "Log",
  [TypeFilter.Lin]: "Lin",
};

const buttonTitleByTimeFilters: Record<TimeFilter, string> = {
  [TimeFilter.FiveMinutes]: "05M",
  [TimeFilter.FifteenMinutes]: "15M",
  [TimeFilter.ThirteenMinutes]: "30M",
  [TimeFilter.OneHour]: "1HR",
  [TimeFilter.FourHours]: "4HR",
  [TimeFilter.OneDay]: "1D",
  [TimeFilter.OneWeek]: "1W",
};

interface Props {
  tokens: string[];
}

const PoolGraph: FC<Props> = ({ tokens }) => {
  const [points, setPoints] = useState([]);
  const [typeFilter, setTypeFilter] = useState(TypeFilter[0]);
  const [timeFilter, setTimeFilter] = useState(TimeFilter[4]);
  const [selectedToken, setSelectedToken] = useState(findRegularToken(tokens));

  const list = preparingSelectList(tokens);
  const [selectFilter, setSelectFilter] = useState(list[0])


  const { getSymbol } = useTokenInfo();

  const filteredPoints = useMemo(() => [...points], [points]);

  const rightButtonsGroup = useMemo(() => (
    enumToArray(TimeFilter).map((filter) => (
      {
        onClick: () => setTimeFilter(filter),
        isActive: timeFilter === filter,
        type: filter,
        title: buttonTitleByTimeFilters[TimeFilter[filter]],
      }
    ))
  ), [timeFilter])

  const leftButtonsGroup = useMemo(() => (
    enumToArray(TypeFilter).map((filter) => (
      {
        onClick: () => setTypeFilter(filter),
        isActive: typeFilter === filter,
        type: filter,
        title: buttonTitleByTypeFilters[TypeFilter[filter]],
      }
    ))
  ), [typeFilter])

  // mock data for graph
  useEffect(() => {
    const pointsArray = () => Array(50).fill('').map((el, index) => (
      {
        x: index,
        y: Math.random(),
      }
    ));

    setPoints(pointsArray);
  },[]);

  const cardTitle = (
    <>
      <Text
        fontSize="xl"
        fontWeight="medium"
      >
        {lookupSymbol(getSymbol(selectedToken))} {' '}
        ${formatAmount(useTokenPrice(selectedToken))}
      </Text>
      <Text
        fontSize="xs"
        fontWeight="medium"
        lineHeight="3"
        align="right"
        color="green.500"
      >
        (+1,25%)
      </Text>
    </>
  );

  return (
    <Card
      w="xl"
      h="sm"
      px="8"
      py="10"
    >
      <Graph
        h="200"
        select={({
          list: list,
          setValue: setSelectFilter,
          value: selectFilter,
        })}
        points={filteredPoints}
        title={cardTitle as ReactNode & string}
        rightButtonsGroup={rightButtonsGroup}
        leftButtonsGroup={leftButtonsGroup}
      />
    </Card>
  );
};

export default PoolGraph;
