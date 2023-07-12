import axios from "axios";
import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import MovieItem from "../components/MovieItem";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { movies, setMovies, balance } = useStateContext();

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

  const formatBalance = (balance) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(balance);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="wrapper">
          {movies &&
            movies.map((movie, ind) => (
              <MovieItem
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
