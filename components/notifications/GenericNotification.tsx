import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import Toast from "components/notifications/Toast";

type Props = {
  title: string;
  description: string;
  toastType: string;
  onClose: () => void;
};

const GenericNotification: FC<Props> = ({
  title,
  description,
  toastType,
  onClose,
}) => {
  return (
    <Toast type={toastType} onClose={onClose}>
      <Text textStyle={["medium"]}>{title}</Text>
      <Text textStyle={["small"]} variant="secondary">
        {description}
      </Text>
    </Toast>
  );
};

export default GenericNotification;
