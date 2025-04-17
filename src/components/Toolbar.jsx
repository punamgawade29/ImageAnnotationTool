// // src/components/Toolbar.js
// import React from 'react';

// const Toolbar = ({ onSelectTool, selectedTool, onCrop }) => {
//   return (
//     <div style={{ marginBottom: '10px' }}>
//       <button onClick={() => onSelectTool('select')} disabled={selectedTool === 'select'}>Select</button>
//       <button onClick={() => onSelectTool('rectangle')} disabled={selectedTool === 'rectangle'}>Rectangle</button>
//       <button onClick={() => onSelectTool('circle')} disabled={selectedTool === 'circle'}>Circle</button>
//       <button onClick={() => onDelete()}>Delete Selected</button> 
//       <button onClick={() => onSelectTool('crop')} disabled={selectedTool === 'crop'}>Crop</button>
//       <button onClick={onCrop}>Crop and Save</button>
//     </div>
//   );
// };

// export default Toolbar;
// import React from 'react';

// const Toolbar = ({ onSelectTool, selectedTool, onCrop, onDelete, onLabelChange, onAddLabel }) => {
//   return (
//     <div style={{ marginBottom: '10px' }}>
//       <div className='button-icon'>
//       <button onClick={() => onSelectTool('select')} disabled={selectedTool === 'select'}>Select</button>
//       <button onClick={() => onSelectTool('crop')} disabled={selectedTool === 'crop'}>Crop<i class="fa fa-crop"></i></button>
//       <button onClick={() => onSelectTool('rectangle')} disabled={selectedTool === 'rectangle'}>Rectangle<i class="fa-light fa-square"></i></button>
//       <button onClick={() => onSelectTool('circle')} disabled={selectedTool === 'circle'}>Circle <i class="fa-solid fa-circle"></i></button>
//       <button onClick={() => onSelectTool('label')} disabled={selectedTool === 'label'}>Label</button>
//       <button onClick={onCrop}>Crop and Save</button>
//       <button onClick={onDelete}>Delete<i class="fa fa-times-circle"/></button>
//       </div>

//       {/* Label input */}
//       {selectedTool === 'label' && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter label text"
//             onChange={(e) => onLabelChange(e.target.value)}
//           />
//           <div className='button-label'>
//           <button onClick={onAddLabel}>Add Label</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Toolbar;


import React from 'react';

const Toolbar = ({ onSelectTool, selectedTool, onCrop, onDelete, onLabelChange, onAddLabel }) => {
  return (
    <div className="toolbar-container">
      <div className="button-icon">
        <button style={{background: selectedTool === 'select' ? 'orange' : 'skyblue' , fontFamily:'Arial, Helvetica, sans-serif', fontSize:15}}onClick={() => onSelectTool('select')} disabled={selectedTool === 'select'}>Select</button>
        <button  style={{background: selectedTool === 'crop' ? 'orange' : 'skyblue', fontFamily:'Arial, Helvetica, sans-serif', fontSize:15}}onClick={() => onSelectTool('crop')} disabled={selectedTool === 'crop'}>Crop<i className="fa fa-crop"></i></button>
        <button style={{background: selectedTool === 'rectangle' ? 'orange' : 'skyblue', fontFamily:'Arial, Helvetica, sans-serif', fontSize:15}}onClick={() => onSelectTool('rectangle')} disabled={selectedTool === 'rectangle'}>Rectangle<i className="fa-light fa-square"></i></button>
        <button style={{background: selectedTool === 'circle' ? 'orange' : 'skyblue', fontFamily:'Arial, Helvetica, sans-serif', fontSize:15}}onClick={() => onSelectTool('circle')} disabled={selectedTool === 'circle'}>Circle <i className="fa-solid fa-circle"></i></button>
        
        <button style={{background: selectedTool === 'onCrop' ? 'orange' : 'skyblue',fontFamily:'Arial, Helvetica, sans-serif', fontSize:15}}onClick={onCrop}>Crop and Save</button>
        <button style={{background: selectedTool === 'onDelete' ? 'orange' : 'skyblue', fontFamily:'Arial, Helvetica, sans-serif', fontSize:15}}onClick={onDelete}>Delete<i className="fa fa-times-circle"/></button>
      </div>

      {/* Label input */}
      {selectedTool === 'label' && (
        <div className="label-input">
          <input
            type="text"
            placeholder="Enter label text"
            onChange={(e) => onLabelChange(e.target.value)}
          />
          <div className="button-label">
            <button onClick={onAddLabel}>Add Label</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
