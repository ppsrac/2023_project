import React from "react";

interface DotProps {
  num: number;
  scrollIndex: number;
}

const Dot: React.FC<DotProps> = ({ num, scrollIndex }) => {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        border: "1px solid gray",
        borderRadius: 999,
        backgroundColor: scrollIndex === num ? "black" : "transparent",
        transitionDuration: "1000ms",
        transitionProperty: "background-color",
      }}
    ></div>
  );
};

interface DotsProps {
  scrollIndex: number;
}

const Dots: React.FC<DotsProps> = ({ scrollIndex }) => {
  return (
    <div style={{ position: "fixed", top: "50%", right: 30 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} scrollIndex={scrollIndex} />
        <Dot num={2} scrollIndex={scrollIndex} />
        <Dot num={3} scrollIndex={scrollIndex} />
      </div>
    </div>
  );
};

export default Dots;
