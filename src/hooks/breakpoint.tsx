import React, { createContext, ReactNode, useContext } from "react";
import { useBreakpoint as useChakraBreakpoint } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

interface BreakpointContextProps {
  breakpoint: string;
  getBreakpointValue: (values: any) => any;
}

const BreakpointContext = createContext({} as BreakpointContextProps);

export function BreakpointProvider({ children }: Props) {
  const breakpoint = useChakraBreakpoint();

  const getBreakpointValue = (values: any) => {
    if (typeof values === "object") {
      const breakpoints = ["base", "sm", "md", "lg", "xl", "2xl"];
      if (Array.isArray(values)) {
        const index = breakpoints.indexOf(breakpoint);

        if (index > values.length - 1) {
          return values[values.length - 1];
        }

        return values[index];
      } else {
        if (values[breakpoint]) {
          return values[breakpoint];
        }

        for (const nearestBreakpoint of breakpoints.splice(0, breakpoints.indexOf(breakpoint)).reverse()) {
          if (values[nearestBreakpoint]) {
            return values[nearestBreakpoint];
          }
        }
      }
    }
    return values;
  };

  return <BreakpointContext.Provider value={{ breakpoint, getBreakpointValue }}>{children}</BreakpointContext.Provider>;
}

export const useBreakpoint = () => useContext(BreakpointContext);

export default BreakpointContext;
