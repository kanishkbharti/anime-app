import React, { useEffect, useState } from "react";
import Search from "./Search";
import { connect } from "react-redux";
import AnimeItem from "./AnimeItem";

const AnimeResults = (props) => {
  const [results, setResults] = useState([]);
  const [limit, setLimit] = useState(6);
  const { animes } = props;

  useEffect(() => {
    const show = animes.slice(0, limit);
    setResults(show);
  }, [animes, limit]);
  console.log("results", results);
  const loadMore = () => {
    setLimit(limit + 6);
  };

  return (
    <div className="container">
      <div className="search_container">
        <Search setResults={setResults} setLimit={setLimit} />
      </div>
      <div className="result_container">
        <div className="movie_container">
          {results.map((item) => {
            return <AnimeItem anime={item} key={item.mal_id} />;
          })}
        </div>
        {results.length && results.length !== animes.length ? (
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
    animes: state.animes,
  };
}

export default connect(mapStateToProps, null)(AnimeResults);
