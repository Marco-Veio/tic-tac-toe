import Head from "next/head";
import { Center } from "@chakra-ui/layout";
import Text from "@/components/Text";
import Link from "next/link";

import { useEffect } from "react";
import { useBoard } from "@/hooks/board";

export default function Home() {
  const playModes = [
    { path: "pvp", text: "2 Players" },
    { path: "easy", text: "Easy" },
    { path: "Medium", text: "Medium" },
    { path: "Hard", text: "Hard" },
    { path: "Impossible", text: "Impossible" },
  ];

  const { resetBoardContext } = useBoard();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetBoardContext(), []);

  return (
    <Center flex={0.9} flexDir="column">
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Created by MarcoVeio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {playModes.map(({ path, text }, index) => (
        <Link href={`/play/${path}`} key={path}>
          <Text id={path} delay={index * 600}>
            {text}
          </Text>
        </Link>
      ))}
    </Center>
  );
}
