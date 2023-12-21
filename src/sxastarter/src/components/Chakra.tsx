import React from 'react';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import petsgalore from '../styles/petsgalore';
import generictheme from '../styles/generictheme';

interface ChakraProps {
  children: React.ReactNode;
  currentTheme: string;
}

export const Chakra = ({ children, currentTheme }: ChakraProps) => {
  let selectedTheme;
  if (currentTheme === 'generictheme') {
    selectedTheme = generictheme;
  } else {
    selectedTheme = petsgalore;
  }

  return (
    <ChakraProvider colorModeManager={localStorageManager} theme={selectedTheme}>
      {children}
    </ChakraProvider>
  );
};
