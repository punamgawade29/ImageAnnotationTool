import React from 'react';

const BoundaryList = ({ boundaries }) => {
  return (
    <div>
      <h3>Boundaries</h3>
      <ul>
        {boundaries.map((boundary, index) => (
          <li key={index}>
            {boundary.type}: x: {boundary.x}, y: {boundary.y}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoundaryList;
