import React, { ReactNode } from "react";

import { Liu_Jian_Mao_Cao } from "@next/font/google";

import { PlayerProvider } from "@/hooks/player";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BoardProvider } from "@/hooks/board";
import { BotProvider } from "@/hooks/bot";

const font = Liu_Jian_Mao_Cao({ subsets: ["latin"], weight: ["400"] });

interface Props {
  children: ReactNode;
}

export default function MainProvider({ children }: Props) {
  return (
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          heading: font.style.fontFamily,
          body: font.style.fontFamily,
        },
      })}
    >
      <PlayerProvider>
        <BoardProvider>
          <BotProvider>{children}</BotProvider>
        </BoardProvider>
      </PlayerProvider>
    </ChakraProvider>
  );
}
