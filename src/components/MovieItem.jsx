import React from "react";
import { Link } from "react-router-dom";

export default function MovieItem({ movie }) {
  return (
    <div className="movie-wrapper">
      <div className="movie-poster">
        <Link to={`/movie/${movie.title}`}>
          <img src={`${movie.poster_url}`} alt={`${movie.title}`} />
        </Link>
      </div>
      <div className="movie-info">
        <Link to={`/movie/${movie.title}`} className="link">
          <div className="movie-title">{movie.title}</div>
        </Link>
        <div className="movie-description">{movie.description}</div>
      </div>
      <div className="movie-info movie-info-gen">
        <div className="movie-price">Rp. {movie.ticket_price},-</div>
        <div className="movie-age_rating">{movie.age_rating}</div>
      </div>
    </div>
  );
}
