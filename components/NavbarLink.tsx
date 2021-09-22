import React, { FC } from "react";
import { Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const NavbarLink: FC<Props> = ({ text, href }) => {
  const { asPath } = useRouter();

  const wrapperStyle =
    asPath === href ? { color: "brand.teal" } : { color: "white" };

  return (
    <Link href={href} passHref>
      <chakra.a
        transition="0.2s all"
        px="2"
        py="8"
        whiteSpace="nowrap"
        _hover={{
          color: "brand.teal",
        }}
        {...wrapperStyle}
      >
        {text}
      </chakra.a>
    </Link>
  );
};

export default NavbarLink;
