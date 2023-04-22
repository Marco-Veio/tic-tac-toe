import React, { useEffect, useMemo, useRef } from "react";
import { Box, HeadingProps, theme } from "@chakra-ui/react";
import Vara from "vara";

import font from "../../public/Parisienne.json";

import {
  ANIMATION_DURATION,
  DEFAULT_FONT_SIZE,
  FONT_SIZE_PROPORTION,
} from "@/utils/constants";

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
    () => (FONT_SIZE_PROPORTION * realFontSize) / DEFAULT_FONT_SIZE,
    [realFontSize]
  );

  useEffect(() => {
    if (!ref.current?.childElementCount) {
      new Vara(`#${id}`, "/Parisienne.json", [
        {
          text: children,
          duration: ANIMATION_DURATION,
          color: "black",
          delay,
          textAlign: "center",
          fontSize: realFontSize,
        },
      ]);
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
