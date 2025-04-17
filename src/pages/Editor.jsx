// // src/pages/Editor.js
// import React from 'react';
// import CanvasEditor from '../components/CanvasEditor';

// const Editor = ({ image, setImage }) => {
//   return (
//     <div style={{ padding: '20px' }}>
//       <button onClick={() => setImage(null)}>← Back</button>
//       <CanvasEditor image={image} />
//     </div>
//   );
// };

// export default Editor;


import React from 'react';
import CanvasEditor from '../components/CanvasEditor';

const Editor = ({ image, setImage }) => {
  return (
    <div className="tool-container">
      <div className="left-side">
        <button className="back-button" style={{background:'violet'}}onClick={() => setImage(null)}>← Back</button>
        {/* Other buttons like Select, Crop, etc. */}
      </div>
      <div className="right-side">
        <CanvasEditor image={image} />
      </div>
    </div>
  );
};

export default Editor;

