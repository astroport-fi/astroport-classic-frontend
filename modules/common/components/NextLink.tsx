import React, { FC } from "react";
import Link, { LinkProps } from "next/link";

type Props = {
  isDisabled?: boolean;
} & React.PropsWithChildren<LinkProps>;

const NextLink: FC<Props> = ({ children, isDisabled = false, ...props }) => {
  if (isDisabled) {
    return <>{children}</>;
  }

  return <Link {...props}>{children}</Link>;
};

export default NextLink;
