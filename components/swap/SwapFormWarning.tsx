import React, { FC } from "react";
import { Text, BoxProps } from "@chakra-ui/react";
import Card from "components/Card";

type Props = {
  content?: string;
} & BoxProps;

const SwapFormWarning: FC<Props> = ({
  content = "The numbers above are estimates and could change based on network activity between the time you submit your transaction and the time it completes.",
  ...props
}) => (
  <Card py="4" mt="4" borderColor="red.300" {...props}>
    <Text display="inline" color="red.500" textStyle="small">
      Warning:{" "}
    </Text>
    <Text display="inline" textStyle="small" variant="secondary">
      {content}
    </Text>
  </Card>
);

export default SwapFormWarning;
