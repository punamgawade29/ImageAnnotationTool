import React from 'react';
import ImageUploader from '../components/ImageUploader';

const Home = ({ setImage }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ margin:20,padding:10 ,color:'red',textAlign:'center'}}>Image Annotation Tool</h1>
      <ImageUploader onUpload={setImage} />
    </div>
  );
};

export default Home;
