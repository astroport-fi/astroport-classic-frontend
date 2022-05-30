import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useClassicNetwork } from "hooks/useClassicNetwork";

type Props = {
  text: string;
  href: string;
  v2_hidden?: boolean;
};

const NavbarLink: FC<Props> = ({ text, href, v2_hidden }) => {
  const { asPath } = useRouter();
  const isClassic = useClassicNetwork();

  const wrapperStyle = asPath.includes(href)
    ? {
        color: "brand.lightPurple",
        textDecoration: "underline",
        textUnderlineOffset: "5px",
      }
    : { color: "white" };

  if (!isClassic && v2_hidden) {
    return null;
  }

  return (
    <Link href={href} passHref>
      <chakra.a
        transition="0.2s all"
        px="2"
        py="8"
        whiteSpace="nowrap"
        _hover={{
          color: "brand.lightPurple",
        }}
        {...wrapperStyle}
      >
        {text}
      </chakra.a>
    </Link>
  );
};

export default NavbarLink;
