import React from "react";

import { connect } from "react-redux";

const AnimeItem = (props) => {
  const { anime } = props;
  return (
    <div className="card">
      <img className="card-img-top" src={anime.image_url} alt={anime.title} />
      <div className="card-body">
        <p className="card-text">{anime.title}.</p>
      </div>
    </div>
  );
};

export default connect(null)(AnimeItem);
