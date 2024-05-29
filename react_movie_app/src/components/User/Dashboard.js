import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import MovieListUser from "./MovieListUser";
import checkAuth from "../Authentication/checkAuth";

function ListMoviesUser() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState(""); // New state for date search
  const user = useSelector((state) => state.auth.user);
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  useEffect(() => {

  const fetchMovies = async () => {
    try {
      let apiUrl = "http://127.0.0.1:8000/api/list/";
      if (searchQuery.trim() !== "") {
        apiUrl = `http://127.0.0.1:8000/api/search/${searchQuery}/`;
      }
      if (searchDate.trim() !== "") { // Check if date search is provided
        apiUrl = `http://127.0.0.1:8000/api/search/date/${searchDate}/`;
      }
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      setMovies(response.data);
      setNoMoviesFound(response.status === 404 || response.data.length === 0);
    } catch (error) {
      setNoMoviesFound(true);
    }
  };

    if (user && user.token) {
      fetchMovies();
    }
  }, [searchQuery, searchDate, user]);

  return (
    <div>
      <Navbar />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input
              className="form-control"
              type="text"
              placeholder="Search your movies by title or date..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchDate(""); // Reset date search when title search changes
              }}
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              type="date"
              placeholder="Search your movies by date..."
              value={searchDate}
              onChange={(event) => {
                setSearchDate(event.target.value);
                setSearchQuery(""); // Reset title search when date search changes
              }}
            />
          </div>
        </div>
        {noMoviesFound && (
          <div className="row">
            <div className="text-center col-12 mt-5">
              <h2>No movies found</h2>
            </div>
          </div>
        )}
        {!noMoviesFound && (
          <>
            <div className="row">
              <div className="col-12">
                <h1
                  className="text-center my-4"
                  style={{
                    fontSize: "50px",
                    backgroundImage:
                      "linear-gradient(to top,#ffffff, #091daf)",
                    color: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  Recommended Movies...
                </h1>
              </div>
            </div>
            <div className="d-flex flex-wrap">
              {movies.map((movie) => (
                <Link
                  to={`/view/${movie.id}`}
                  key={movie.id}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>
                    <MovieListUser movie={movie} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default checkAuth(ListMoviesUser);
