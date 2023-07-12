import axios from "axios";
import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import MovieListItem from "../components/MovieListItem";
import Navbar from "../components/Navbar";
import { formatBalance } from "../utils/formatBalance";

export default function Dashboard() {
  const { movies, setMovies } = useStateContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MOVIE}`)
      .then(({ data }) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="main-wrapper">
          {movies &&
            movies.map((movie, ind) => (
              <MovieListItem
                key={ind}
                movie={movie}
                formatBalance={formatBalance}
              />
            ))}
        </div>
      </main>
    </>
  );
}
