import React, { useState, useContext, useEffect } from "react";
import { TvContext, ErrorContext } from "./context";
import errors from "./errors";
import { fetchRecommendation, convertImdbIdtoId } from "./service";
import unavailablePic from "./unavailable.jpg";

const Recommendation = () => {
  const [tvState, setTvState] = useContext(TvContext);

  const [recommendationList, setRecommendationList] = useState([]);
  const [setError] = useContext(ErrorContext);

  useEffect(() => {
    if (tvState.id) {
      getRecommendation(tvState.id);
      setError("");
    } else {
      convertImdbIdtoId(tvState.imdbID)
        .then((json) => {
          const id = json.tv_results[0].id;
          getRecommendation(id);
        })
        .catch((err) => {
          setError(errors[err.error || "DEFAULT"]);
        });
    }
  }, [tvState.imdbID, tvState.id]);

  const getRecommendation = (id) => {
    return fetchRecommendation(id)
      .then((json) => {
        setRecommendationList(json.results.slice(0, 4));
        setError("");
      })
      .catch((err) => {
        setError(errors[err.error || "DEFAULT"]);
      });
  };
  const searchById = (id) => {
    setTvState({ ...tvState, id: id });
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const maxIndex = recommendationList.length - 1;
  const nextIndex = activeIndex === maxIndex ? 0 : activeIndex + 1;
  const prevIndex = activeIndex === 0 ? maxIndex : activeIndex - 1;

  const goToNext = () => {
    setActiveIndex(nextIndex);
  };

  const goToPrev = () => {
    setActiveIndex(prevIndex);
  };

  const imgURL = "https://image.tmdb.org/t/p/w500/";
  const recommendationArray = recommendationList.map((tv, index) => {
    let classes = ['carousel__slide'];
    if (index === activeIndex) {
      classes.push('carousel__slide--active');
    }

    let introduction;
    if (tv.poster_path) {
      introduction = (
        <img
          src={imgURL + tv.poster_path}
          className="clickable"
          onClick={() => searchById(tv.id)}
          alt="poster"
        />
      );
    } else {
      introduction = (
        <img
          src={unavailablePic}
          alt="poster unavailable"
          className="clickable"
          onClick={() => searchById(tv.id)}
        />
      );
    }
    return (
      <li key={recommendationList.indexOf(tv)} className={ classes.join(' ') }>
        <p className="clickable" onClick={() => searchById(tv.id)}>
          {tv.title}
        </p>
        <p className="time"> {tv.release_date} </p>
        <p className="rating"> Rating: {tv.vote_average} </p>
        {introduction}
      </li>
    );
  });

  return (
    <div className="carousel" role="region" >
      <h2>
        Because you clicked <span className="highlight-title">{tvState.Title}</span> :
      </h2>
      <div className="carousel__div">
      <button 
        className="carousel__control carousel__control--previous" 
        onClick={goToPrev} 
        aria-label='Prev'
      >
      &lt;
      </button>
      <div className="carousel__content">
        <ul className="recommendation">
        {recommendationArray}
        </ul>
      </div>
      <button
        className="carousel__control carousel__control--previous"
        onClick={goToNext}
        aria-label='Next'
      >
      &gt;
      </button>
      </div>
    </div>
  );
};

export default Recommendation;
