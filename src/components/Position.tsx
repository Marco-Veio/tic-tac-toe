import React from "react";
import { Button } from "@chakra-ui/react";
import Text from "@/components/Text";

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
      h="195"
      w="195"
      bgColor="transparent"
      isDisabled={!!value || disabled}
    >
      {value && (
        <Text fontSize="7xl" id={id}>
          {value}
        </Text>
      )}
    </Button>
  );
}
