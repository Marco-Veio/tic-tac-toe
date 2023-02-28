import React from "react";
import { Box, Button } from "@chakra-ui/react";

import { IPlayerOrEmpty } from "@/types/board";
import Text from "./Text";

type Props = {
  id: string;
  value: IPlayerOrEmpty;
  onClick: () => void;
};

export default function Square({ id, value, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      h="195"
      w="195"
      bgColor="transparent"
      isDisabled={!!value}
    >
      {value && (
        <Text fontSize="7xl" id={id}>
          {` ${value}`}
        </Text>
      )}
    </Button>
  );
}
