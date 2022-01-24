import React, { useContext } from "react";
import { TvContext } from "./context";

const BackToHomeBtn = () => {
  const [tvState, setTvState] = useContext(TvContext);
  return (
    <button className="header-btn"
      onClick={() => {
        setTvState({});
      }}
    >
      Home
    </button>
  );
};

export default BackToHomeBtn;
