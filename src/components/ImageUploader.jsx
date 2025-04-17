// import React from 'react';

// const ImageUploader = ({ onUpload }) => {
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         onUpload(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default ImageUploader;


import React from 'react';

const ImageUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader" style={{ margin:30,textAlign:'center'
  
      }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploader;
