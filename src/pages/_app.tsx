import { useState } from "react";
import Link from "next/link";
import { Box, Center } from "@chakra-ui/react";
import Text from "@/components/Text";

import MainProvider from "@/contexts";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);

  setTimeout(() => setShow(true), 600);

  return (
    <MainProvider>
      <Box w="100vw" h="100vh" display="flex" flexDir="column">
        <Center w="full" pt={5} flex={0.1}>
          <Link href="/">
            <Text id="tictactoe">Tic Tac Toe</Text>
          </Link>
        </Center>
        {show && <Component {...pageProps} />}
      </Box>
    </MainProvider>
  );
}
