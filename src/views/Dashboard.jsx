import axios from "axios";
import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import MovieItem from "../components/MovieItem";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { movies, setMovies, balance, setBalance } = useStateContext();

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
      <nav className="nav">
        <div className="title">SEA CINEMA</div>
        <div className="balance">
          <div className="balance-info">
            <span>Balance:</span>
            <span>Rp. {balance ? balance : "-"}</span>
          </div>
          <div className="balance-action">
            <Link to="/balance/topup" className="topup-balance">
              Top up
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <div className="wrapper">
          {movies &&
            movies.map((movie, ind) => <MovieItem key={ind} movie={movie} />)}
        </div>
      </main>
    </>
  );
}
