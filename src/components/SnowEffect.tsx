"use client";

import React from "react";
import Snowfall from "react-snowfall";

const SnowEffect = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <Snowfall snowflakeCount={500} />
    </div>
  );
};

export default SnowEffect;
