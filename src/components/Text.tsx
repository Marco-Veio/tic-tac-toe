import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, HeadingProps, useTheme } from "@chakra-ui/react";
import Vara from "vara";

import { useBreakpoint } from "@/hooks/breakpoint";

import font from "../../public/Parisienne.json";

import { ANIMATION_DURATION, DEFAULT_FONT_SIZE, FONT_SIZE_PROPORTION } from "@/utils/constants";

interface Props extends HeadingProps {
  id: string;
  delay?: number;
  children: string;
}

export default function Text({ id, children, delay = 0, fontSize = { base: "4xl", md: "6xl" }, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { getBreakpointValue } = useBreakpoint();
  const size = getBreakpointValue(fontSize);

  const theme = useTheme();

  const realFontSize = useMemo(() => {
    return +theme.fontSizes[size as keyof typeof theme.fontSizes].replace("rem", "") * 16;
  }, []);

  const fontProportion = useMemo(() => {
    if (realFontSize) {
      return (FONT_SIZE_PROPORTION * realFontSize) / DEFAULT_FONT_SIZE;
    }
  }, [realFontSize]);

  useEffect(() => {
    if (ref.current && !ref.current?.childElementCount) {
      new Vara(`#${id}`, "/Parisienne.json", [
        {
          text: children,
          duration: ANIMATION_DURATION,
          color: theme.colors.black,
          delay,
          textAlign: "center",
          fontSize: realFontSize,
          strokeWidth: 0.8,
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
