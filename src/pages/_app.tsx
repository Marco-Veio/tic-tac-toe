import { Box, Center, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Liu_Jian_Mao_Cao } from "@next/font/google";
import Text from "@/components/Text";

import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Link from "next/link";
import { useState } from "react";

const font = Liu_Jian_Mao_Cao({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);

  setTimeout(() => setShow(true), 1500);

  return (
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          heading: font.style.fontFamily,
          body: font.style.fontFamily,
        },
      })}
    >
      <Box w="100vw" h="100vh" display="flex" flexDir="column">
        <Center w="full" pt={5} flex={0.1}>
          <Link href="/">
            <Text id="tictactoe">Tic Tac Toe</Text>
          </Link>
        </Center>
        {show && <Component {...pageProps} />}
      </Box>
    </ChakraProvider>
  );
}
