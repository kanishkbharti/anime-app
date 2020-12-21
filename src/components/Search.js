import React, { useState } from "react";
import { API_URL } from "../utils/api";
import { animes } from "../actions";
import { connect } from "react-redux";
const Search = (props) => {
  const [anime, setanime] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const { setResults, setLimit, animes } = props;

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    setanime("");
    setResults([]);
    setLimit(6);
    let url = `${API_URL}?q=${anime}`;
    setKey(url);
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        setLoading(false);
        if (jsondata.results) {
          animes(jsondata.results);
        } else {
          animes([]);
        }
      });
  };

  return (
    <div>
      <form onSubmit={(e) => search(e)}>
        <div className="search">
          <div className="form-group search_bar">
            <input
              type="text"
              className="form-control"
              required
              minLength="3"
              value={anime}
              onChange={(e) => setanime(e.target.value)}
            />
          </div>
          <div className="submit_btn">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <p className="api_text"> {key}</p>
      {loading && (
        <img
          className="load"
          src="https://i2.wp.com/codemyui.com/wp-content/uploads/2015/06/windows-8-busy-loader-in-pure-css.gif?fit=880%2C440&ssl=1"
          alt="Loading..."
        />
      )}
    </div>
  );
};

export default connect(null, { animes })(Search);
