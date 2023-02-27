import Head from "next/head";
import { Center } from "@chakra-ui/layout";
import Board from "@/components/Board";

export default function Play() {
  return (
    <Center flex={0.9}>
      <Head>
        <title>O</title>
        <meta name="description" content="Created by MarcoVeio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Board />
    </Center>
  );
}
