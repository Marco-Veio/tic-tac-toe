import React, { useEffect, useRef } from "react";
import { Box, HeadingProps, theme } from "@chakra-ui/react";
import Vara from "vara";

interface Props extends HeadingProps {
  id: string;
  delay?: number;
  children: string;
}

export default function Text({
  id,
  children,
  fontSize = "6xl",
  delay = 0,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current?.childElementCount) {
      new Vara(`#${id}`, "/Parisienne.json", [
        {
          text: children,
          duration: 1500,
          color: "black",
          delay,
          fontSize:
            +theme.fontSizes[fontSize as keyof typeof theme.fontSizes].replace(
              "rem",
              ""
            ) * 16,
        },
      ]);
    }
  }, [id, children, fontSize, delay]);

  return <Box id={id} ref={ref} w={35.5 * children.length} {...rest} />;
}
