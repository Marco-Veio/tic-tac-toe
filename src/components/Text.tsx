import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, HeadingProps, theme, useBreakpointValue } from "@chakra-ui/react";
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

export default function Text({ id, children, delay = 0, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [bk, setBk] = useState(0);
  const fontSize = useBreakpointValue(
    { base: "4xl", md: "6xl" },
    { fallback: "md" }
  );

  useEffect(() => setBk((oldState) => ++oldState), [fontSize]);

  const realFontSize = useMemo(() => {
    if (bk > 1) {
      return (
        +theme.fontSizes[fontSize as keyof typeof theme.fontSizes].replace(
          "rem",
          ""
        ) * 16
      );
    }
  }, [bk]);

  const fontProportion = useMemo(() => {
    if (realFontSize)
      return (FONT_SIZE_PROPORTION * realFontSize) / DEFAULT_FONT_SIZE;
  }, [realFontSize]);

  useEffect(() => {
    if (ref.current && !ref.current?.childElementCount) {
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
    if (fontProportion) {
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
    }
  };

  if (realFontSize) {
    return <Box id={id} ref={ref} w={getWidth()} {...rest} />;
  }
  return <></>;
}
