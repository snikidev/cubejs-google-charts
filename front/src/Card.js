import React from "react";

const Card = ({ title, children }) => (
  <div className="rounded shadow p-4">
    <h3 className="text-lg text-indigo-500 font-semibold text-center mb-4">
      {title}
    </h3>
    {children}
  </div>
);

export default Card;
