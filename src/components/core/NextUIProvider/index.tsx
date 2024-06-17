import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";

interface NextUIProviderProps {
  children: React.ReactNode
}

export const NextUIAppProvider: React.FC<NextUIProviderProps> = ({ children }) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}