import React from "react";
import { Button } from "@chakra-ui/react";
import Text from "@/components/Text";
import { css } from "@emotion/react";

import { IPlayerOrEmpty } from "@/types/board";

interface Props {
  id: string;
  value: IPlayerOrEmpty;
  disabled: boolean;
  onClick: () => void;
}

export default function Position({ id, value, disabled, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      h={{ base: "95", md: "195" }}
      w={{ base: "95", md: "195" }}
      bgColor="transparent"
      isDisabled={!!value || disabled}
      _disabled={{
        bg: "transparent",
        _hover: {
          bg: "transparent",
        },
      }}
      css={css`
        &:disabled {
          cursor: not-allowed !important;
        }
      `}
    >
      {value && (
        <Text id={id} fontSize={{ base: "5xl", md: "7xl" }}>
          {value}
        </Text>
      )}
    </Button>
  );
}
