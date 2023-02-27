import React from "react";
import { Box, Button, Image, SimpleGrid } from "@chakra-ui/react";

export default function Board() {
  return (
    <SimpleGrid w="600px" h="600px" columns={3} spacing={2} position="relative">
      <Box position="absolute" left="180" zIndex={1}>
        <Image alt="Left Vertical Board Line" src="../boardLeft.svg" h={600} />
      </Box>
      <Box position="absolute" right="180" zIndex={1}>
        <Image
          alt="Right Vertical Board Line"
          src="../boardRight.svg"
          h={600}
        />
      </Box>
      <Box position="absolute" top="180" zIndex={1}>
        <Image alt="Top Horizontal Board Line" src="../boardTop.svg" w={600} />
      </Box>
      <Box position="absolute" bottom="180" zIndex={1}>
        <Image
          alt="Bottom Horizontal Board Line"
          src="../boardBottom.svg"
          w={600}
        />
      </Box>
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
      <Button h="full" w="full" opacity={0.5} />
    </SimpleGrid>
  );
}
