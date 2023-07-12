import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  movies: [],
  balance: "",
  setMovies: () => {},
  setBalance: () => {},
});

export const ContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [balance, setBalance] = useState("2000000");

  return (
    <StateContext.Provider value={{ movies, setMovies, balance, setBalance }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
