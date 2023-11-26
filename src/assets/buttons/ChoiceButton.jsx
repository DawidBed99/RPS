import { useEffect, useState } from "react";
import "../../App.css";

export default function ChoiceButton({ source, elementID, handleClick, name }) {
  const isHidden = true;
  const [clickShadow, setClickShadow] = useState(false);
  return (
    <button
      onClick={() => {
        handleClick(name, isHidden);
        setClickShadow(true);
      }}
      className="choiceBTN"
      id={elementID}
    >
      <div className="paperIMGContainer">
        <span id="imgShadow"></span>
        <img id="paperIMG" src={source} alt=""></img>
      </div>
    </button>
  );
}
