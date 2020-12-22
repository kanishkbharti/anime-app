import React, { useEffect, useState } from "react";
import Search from "./Search";
import { connect } from "react-redux";
import { API_URL } from "../utils/api";
import { animes } from "../actions";
import AnimeItem from "./AnimeItem";
const { v4: uuidv4 } = require("uuid");

const AnimeResults = (props) => {
  const [results, setResults] = useState([]);
  const [limit, setLimit] = useState(2);
  const [anime, setanime] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastpage, setLastPage] = useState(0);
  const { animesArr } = props;

  useEffect(() => {
    let show = [...results, ...animesArr];
    setResults(show);
  }, [animesArr, limit]);

  const loadMore = () => {
    setLimit((limit) => limit + 1);
    setLoading(true);
    let url = `${API_URL}?q=${anime}&limit=15&page=${limit}`;
    setKey(url);
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        setLoading(false);
        if (jsondata.results) {
          let show = [...results, ...jsondata.results];
          setResults(show);
        }
      });
  };

  return (
    <div className="container">
      <div className="search_container">
        <Search
          setResults={setResults}
          setLimit={setLimit}
          setanime={setanime}
          setLoading={setLoading}
          setKey={setKey}
          setLastPage={setLastPage}
        />
      </div>
      <p className="api_text"> {key}</p>
      {loading && (
        <img
          className="load"
          src="https://i2.wp.com/codemyui.com/wp-content/uploads/2015/06/windows-8-busy-loader-in-pure-css.gif?fit=880%2C440&ssl=1"
          alt="Loading..."
        />
      )}
      <div className="result_container">
        <div className="movie_container">
          {results.map((item) => {
            return <AnimeItem anime={item} key={uuidv4()} />;
          })}
        </div>
        {results.length && limit <= lastpage ? (
          <button className="load_more" onClick={loadMore}>
            Load More...
          </button>
        ) : null}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    animesArr: state.animes,
  };
}

export default connect(mapStateToProps, { animes })(AnimeResults);
