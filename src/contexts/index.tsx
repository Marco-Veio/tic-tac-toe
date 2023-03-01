import React, { ReactNode } from "react";

import { Liu_Jian_Mao_Cao } from "@next/font/google";

import { PlayerProvider } from "@/hooks/player";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BoardProvider } from "@/hooks/board";

const font = Liu_Jian_Mao_Cao({ subsets: ["latin"], weight: ["400"] });

type Props = { children: ReactNode };

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
        <BoardProvider>{children}</BoardProvider>
      </PlayerProvider>
    </ChakraProvider>
  );
}
