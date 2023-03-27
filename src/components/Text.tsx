import React, { useEffect, useMemo, useRef } from "react";
import { Box, HeadingProps, theme } from "@chakra-ui/react";
import Vara from "vara";

import font from "../../public/Parisienne.json";

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

  const realFontSize = useMemo(
    () =>
      +theme.fontSizes[fontSize as keyof typeof theme.fontSizes].replace(
        "rem",
        ""
      ) * 16,
    [fontSize]
  );
  const fontProportion = useMemo(
    () => (0.8785557867671893 * realFontSize) / 24,
    [realFontSize]
  );

  useEffect(() => {
    if (!ref.current?.childElementCount) {
      const text = new Vara(`#${id}`, "/Parisienne.json", [
        {
          text: children,
          duration: 600,
          color: "black",
          delay,
          textAlign: "center",
          fontSize: realFontSize,
        },
      ]);
      console.log(text);
    }
  }, [id, children, realFontSize, delay]);

  const getWidth = () => {
    let width = 0;
    for (const char of children) {
      const code = char.charCodeAt(0).toString();
      if (char === " ") {
        width += font.p.space * fontProportion;
      } else {
        // @ts-ignore
        width += font.c[code].w * fontProportion;
      }
    }
    return Math.ceil(width + font.p.space * fontProportion);
  };

  return <Box id={id} ref={ref} w={getWidth()} {...rest} />;
}
