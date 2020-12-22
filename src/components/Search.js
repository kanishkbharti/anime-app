import React, { useState } from "react";
import { API_URL } from "../utils/api";
import { animes } from "../actions";
import { connect } from "react-redux";
const Search = (props) => {
  const [inputValue, setInputValue] = useState("");
  const {
    setResults,
    setLimit,
    animes,
    setanime,
    setKey,
    setLoading,
    setLastPage,
  } = props;

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    animes([]);
    setanime(inputValue);
    let url = `${API_URL}?q=${inputValue}&limit=15&page=1`;
    setKey(url);
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        setLoading(false);
        setLastPage(jsondata.last_page);
        setLimit(2);
        console.log(jsondata.last_page);
        if (jsondata.results) {
          animes(jsondata.results);
        } else {
          animes([]);
        }
      });
    setInputValue("");
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="submit_btn">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { animes })(Search);
