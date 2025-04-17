import React, { useState } from 'react';
import Home from './pages/Home';
import Editor from './pages/Editor';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div>
      {uploadedImage ? (
        <Editor image={uploadedImage} setImage={setUploadedImage} />
      ) : (
        <Home setImage={setUploadedImage} />
      )}
    </div>
  );
};

export default App;
