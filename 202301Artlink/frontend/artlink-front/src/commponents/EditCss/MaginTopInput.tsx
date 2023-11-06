import React from "react";

interface MarginTopInputProps {
  value: number; // value 속성의 타입을 숫자로 지정합니다. 필요에 따라 다른 타입으로 변경할 수 있습니다.
}

const MarginTopInput: React.FC<MarginTopInputProps> = ({ value }) => {
  return (
    <>
      <div style={{ marginTop: value }}></div>
    </>
  );
};

export default MarginTopInput;
