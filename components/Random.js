import React, { useState } from "react";

function Random() {
  const [count, setCount] = useState(0);
  return (
    <div
      onMouseMove={() => {
        setCount(count + 1);
      }}
    >
      Random, {count}
    </div>
  );
}

export default Random;
