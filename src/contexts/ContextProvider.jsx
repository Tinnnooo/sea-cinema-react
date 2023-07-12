import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  movies: [],
  balance: 0,
  setMovies: () => {},
  setBalance: () => {},
});

export const ContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [balance, setBalance] = useState(
    localStorage.getItem("sea-cinema-balance") ?? 0
  );

  const setCinemaBalance = (balance) => {
    if (balance) {
      localStorage.setItem("sea-cinema-balance", balance);
    }
    setBalance(balance);
  };

  return (
    <StateContext.Provider
      value={{ movies, setMovies, balance, setCinemaBalance }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
