import React from "react";
const Xcomp = () => {
  return (
    <>
      <div className="bar-one bar"></div>
      <div className="bar-two bar"></div>
    </>
  );
};
const Ocomp = () => {
  return <div className="circule"></div>;
};
function Square({ chooseSquare, val }) {
  return (
    <div className="square" onClick={chooseSquare}>
      {val === "X" ? <Xcomp /> : val === "O" ? <Ocomp /> : ""}
    </div>
  );
}

export default Square;
