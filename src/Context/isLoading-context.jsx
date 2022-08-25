import React, { useState } from 'react';

const IsLoadingContext = React.createContext({
  isLoading: false,
  setIsLoading: () => {}
});

/**
 * Provide isLoading context.
 * @returns {JSX} - JSX Element.
 */
export function IsLoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    isLoading,
    setIsLoading
  };

  return (
    <IsLoadingContext.Provider value={contextValue}>
      {children}
    </IsLoadingContext.Provider>
  );
}

export default IsLoadingContext;
