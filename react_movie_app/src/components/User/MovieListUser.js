import React from "react";
import checkAuth from "../Authentication/checkAuth";

function MovieListUser({ movie }) {
  const movieStyle = {
    background: 'linear-gradient(#05216d 0.2%, #181818 80%)',
    color: '#ffffff'
  };
  return (
    <div className="movie" style={movieStyle} key={movie.id}>
      <div className="heading">
        <h2>{movie.title}</h2>
      </div>
      <div className="show-date">
        Bookings from :&nbsp;<strong>{movie.release_date}</strong>
      </div>
        <div className="genre text-center">
          <b>{movie.genre}</b>
        </div>
      <div className="photo my-2">
        <img
          src={
            movie.poster !== "N/A"
              ? movie.poster
              : "https://via.placeholder.com/400"
          }
          alt={movie.title}
        />
      </div>
      <div className="details text-center bg-success">
        <div className="price">
          Rs : <b>{movie.price}</b>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(MovieListUser);