import React, { createContext, useContext, useState } from "react";

type SearchStateContextValue = {
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  nftData: Array<any> | undefined;
  setNftData: React.Dispatch<React.SetStateAction<Array<any> | undefined>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const SearchStateContext = createContext<SearchStateContextValue | undefined>(
  undefined
);

export const SearchStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nftData, setNftData] = useState<Array<any>>();
  const [error, setError] = useState("");

  return (
    <SearchStateContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        nftData,
        setNftData,
        error,
        setError,
      }}
    >
      {children}
    </SearchStateContext.Provider>
  );
};

export const useSearchState = () => {
  const context = useContext(SearchStateContext);
  if (!context) {
    throw new Error("useSearchState must be used within SearchStateProvider");
  }
  return context;
};
