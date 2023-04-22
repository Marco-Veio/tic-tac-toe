import Head from "next/head";
import { Center } from "@chakra-ui/layout";
import Link from "next/link";
import Text from "@/components/Text";

import { useEffect } from "react";
import { useBoard } from "@/hooks/board";
import { useBot } from "@/hooks/bot";

export default function Home() {
  const playModes = [
    { path: "pvp", text: "2 Players" },
    { path: "easy", text: "Easy" },
    { path: "Medium", text: "Medium" },
    { path: "Hard", text: "Hard" },
    { path: "Impossible", text: "Impossible" },
  ];

  const { resetBoardContext } = useBoard();
  const { setBot } = useBot();

  useEffect(() => {
    setBot("");
    resetBoardContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
