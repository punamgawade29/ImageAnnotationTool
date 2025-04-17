// import React, { useEffect, useState, useRef } from 'react';
// import { Stage, Layer, Image as KonvaImage, Rect, Circle, Text } from 'react-konva';
// import useImage from 'use-image';
// import Toolbar from './Toolbar';

// const CanvasEditor = ({ image }) => {
//   const [tool, setTool] = useState('select');
//   const [shapes, setShapes] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [imageObj] = useImage(image);
//   const [cropRect, setCropRect] = useState(null);
//   const [labelText, setLabelText] = useState('');
//   const [labelPosition, setLabelPosition] = useState(null);

//   const stageRef = useRef();
//   const [drawingCrop, setDrawingCrop] = useState(false);
//   const [startPos, setStartPos] = useState(null);

//   const handleStageMouseDown = (e) => {
//     const stage = e.target.getStage();
//     const pointer = stage.getPointerPosition();

//     if (tool === 'crop') {
//       setStartPos(pointer);
//       setDrawingCrop(true);
//     } else if (tool === 'rectangle' || tool === 'circle') {
//       const newShape = {
//         id: Date.now().toString(),
//         type: tool,
//         x: pointer.x,
//         y: pointer.y,
//         width: 100,
//         height: 100,
//         radius: 50,
//       };
//       setShapes([...shapes, newShape]);
//       setTool('select');
//     } else if (tool === 'label' && labelText) {
//       setLabelPosition(pointer);  // Store the mouse position for label placement
//     } else if (tool === 'delete' && selectedId) {
//       setShapes(shapes.filter(shape => shape.id !== selectedId));
//       setSelectedId(null);
//       setTool('select');
//     } else {
//       setSelectedId(null);
//     }
//   };

//   const handleAddLabel = () => {
//     if (labelText && labelPosition) {
//       const newLabel = {
//         id: Date.now().toString(),
//         type: 'label',
//         x: labelPosition.x,
//         y: labelPosition.y,
//         text: labelText,
//       };
//       setShapes([...shapes, newLabel]);
//       setLabelText(''); // Clear input field after placing label
//       setLabelPosition(null); // Reset position after label is added
//       setTool('select');
//     }
//   };

//   const handleStageMouseMove = (e) => {
//     if (!drawingCrop || tool !== 'crop') return;

//     const pointer = e.target.getStage().getPointerPosition();
//     const width = pointer.x - startPos.x;
//     const height = pointer.y - startPos.y;

//     setCropRect({
//       x: startPos.x,
//       y: startPos.y,
//       width,
//       height,
//     });
//   };

//   const handleStageMouseUp = () => {
//     if (drawingCrop && tool === 'crop') {
//       setDrawingCrop(false);
//     }
//   };

//   const handleDrag = (index, pos) => {
//     const newShapes = [...shapes];
//     newShapes[index] = { ...newShapes[index], ...pos };
//     setShapes(newShapes);
//   };

//   const cropAndSaveImage = () => {
//     if (!cropRect || Math.abs(cropRect.width) < 1 || Math.abs(cropRect.height) < 1) {
//       alert('Please drag to select a crop area!');
//       return;
//     }

//     const { x, y, width, height } = cropRect;

//     const canvas = document.createElement('canvas');
//     canvas.width = Math.abs(width);
//     canvas.height = Math.abs(height);

//     const ctx = canvas.getContext('2d');

//     if (imageObj) {
//       ctx.drawImage(
//         imageObj,
//         x,
//         y,
//         width,
//         height,
//         0,
//         0,
//         width,
//         height
//       );

//       const dataURL = canvas.toDataURL('image/png');
//       const link = document.createElement('a');
//       link.download = 'cropped-image.png';
//       link.href = dataURL;
//       link.click();

//       setCropRect(null); // Optional: clear crop rect after save
//     }
//   };

//   const saveAsJPG = () => {
//     const uri = stageRef.current.toDataURL({ mimeType: 'image/jpeg' });
//     const link = document.createElement('a');
//     link.download = 'annotated-image.jpg';
//     link.href = uri;
//     link.click();
//   };

//   const exportAnnotations = () => {
//     const annotationData = JSON.stringify(shapes, null, 2);
//     const blob = new Blob([annotationData], { type: 'application/json' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'annotations.json';
//     link.click();
//   };

//   const saveCanvasAsPNG = () => {
//     const uri = stageRef.current.toDataURL();
//     const link = document.createElement('a');
//     link.download = 'annotated-canvas.png';
//     link.href = uri;
//     link.click();
//   };

//   // Define the onDelete function
//   const handleDelete = () => {
//     if (selectedId) {
//       setShapes(shapes.filter(shape => shape.id !== selectedId));
//       setSelectedId(null);
//       setTool('select');
//     }
//   };

//   return (
//     <>
//       <Toolbar
//         onSelectTool={setTool}
//         selectedTool={tool}
//         onCrop={cropAndSaveImage}
//         onDelete={handleDelete}
//         onLabelChange={setLabelText} // Add onLabelChange prop
//         onAddLabel={handleAddLabel} // Add onAddLabel prop for the label button
//       />
//       <div style={{ margin: '20px 0' }}>
//         <button onClick={saveAsJPG} style={{ margin:'20px' }}>Download as JPG</button>
//         <button onClick={saveCanvasAsPNG} style={{ margin:'20px' }}>Save Annotated Canvas</button>
//         <button onClick={exportAnnotations}style={{ margin:'20px' }}>Export Annotations JSON</button>
//       </div>

//       <Stage
//         width={400}
//         height={300}
       
//         onMouseDown={handleStageMouseDown}
//         onMouseMove={handleStageMouseMove}
//         onMouseUp={handleStageMouseUp}
//         ref={stageRef}
//       >
//         <Layer>
//           {imageObj && <KonvaImage image={imageObj} />}
//           {shapes.map((shape, i) => {
//             if (shape.type === 'rectangle') {
//               return (
//                 <Rect
//                   key={shape.id}
//                   x={shape.x}
//                   y={shape.y}
//                   width={shape.width}
//                   height={shape.height}
//                   fill={shape.id === selectedId ? 'rgba(0,0,255,0.3)' : 'rgba(0,0,0,0.2)'}
//                   stroke="blue"
//                   draggable
//                   onClick={() => setSelectedId(shape.id)}
//                   onDragEnd={(e) => handleDrag(i, { x: e.target.x(), y: e.target.y() })}
//                 />
//               );
//             } else if (shape.type === 'circle') {
//               return (
//                 <Circle
//                   key={shape.id}
//                   x={shape.x}
//                   y={shape.y}
//                   radius={shape.radius}
//                   fill={shape.id === selectedId ? 'rgba(255,0,0,0.3)' : 'rgba(0,0,0,0.2)'}
//                   stroke="red"
//                   draggable
//                   onClick={() => setSelectedId(shape.id)}
//                   onDragEnd={(e) => handleDrag(i, { x: e.target.x(), y: e.target.y() })}
//                 />
//               );
//             } else if (shape.type === 'label') {
//               return (
//                 <Text
//                   key={shape.id}
//                   x={shape.x}
//                   y={shape.y}
//                   text={shape.text}
//                   fontSize={18}
//                   draggable
//                   fill="black"
//                   onClick={() => setSelectedId(shape.id)}
//                   onDragEnd={(e) => handleDrag(i, { x: e.target.x(), y: e.target.y() })}
//                 />
//               );
//             }
//             return null;
//           })}
//           {cropRect && (
//             <Rect
//               x={cropRect.x}
//               y={cropRect.y}
//               width={cropRect.width}
//               height={cropRect.height}
//               stroke="green"
//               dash={[10, 5]}
//             />
//           )}
//         </Layer>
//       </Stage>
//     </>
//   );
// };

// export default CanvasEditor;


import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Circle, Text } from 'react-konva';
import useImage from 'use-image';
import Toolbar from './Toolbar';

const CanvasEditor = ({ image }) => {
  const [tool, setTool] = useState('select');
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [imageObj] = useImage(image);
  const [cropRect, setCropRect] = useState(null);
  const [labelText, setLabelText] = useState('');
  const [labelPosition, setLabelPosition] = useState(null);

  const stageRef = useRef();
  const [drawingCrop, setDrawingCrop] = useState(false);
  const [startPos, setStartPos] = useState(null);

  const handleStageMouseDown = (e) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    if (tool === 'crop') {
      setStartPos(pointer);
      setDrawingCrop(true);
    } else if (tool === 'rectangle' || tool === 'circle') {
      const newShape = {
        id: Date.now().toString(),
        type: tool,
        x: pointer.x,
        y: pointer.y,
        width: 100,
        height: 100,
        radius: 50,
      };
      setShapes([...shapes, newShape]);
      setTool('select');
    } else if (tool === 'label' && labelText) {
      setLabelPosition(pointer);
    } else if (tool === 'delete' && selectedId) {
      setShapes(shapes.filter(shape => shape.id !== selectedId));
      setSelectedId(null);
      setTool('select');
    } else {
      setSelectedId(null);
    }
  };

  const handleAddLabel = () => {
    if (labelText && labelPosition) {
      const newLabel = {
        id: Date.now().toString(),
        type: 'label',
        x: labelPosition.x,
        y: labelPosition.y,
        text: labelText,
      };
      setShapes([...shapes, newLabel]);
      setLabelText('');
      setLabelPosition(null);
      setTool('select');
    }
  };

  const handleStageMouseMove = (e) => {
    if (!drawingCrop || tool !== 'crop') return;

    const pointer = e.target.getStage().getPointerPosition();
    const width = pointer.x - startPos.x;
    const height = pointer.y - startPos.y;

    setCropRect({
      x: startPos.x,
      y: startPos.y,
      width,
      height,
    });
  };

  const handleStageMouseUp = () => {
    if (drawingCrop && tool === 'crop') {
      setDrawingCrop(false);
    }
  };

  const handleDrag = (index, pos) => {
    const newShapes = [...shapes];
    newShapes[index] = { ...newShapes[index], ...pos };
    setShapes(newShapes);
  };

  const cropAndSaveImage = () => {
    if (!cropRect || Math.abs(cropRect.width) < 1 || Math.abs(cropRect.height) < 1) {
      alert('Please drag to select a crop area!');
      return;
    }

    const { x, y, width, height } = cropRect;
    const canvas = document.createElement('canvas');
    canvas.width = Math.abs(width);
    canvas.height = Math.abs(height);
    const ctx = canvas.getContext('2d');

    if (imageObj) {
      ctx.drawImage(
        imageObj,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
      );

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = dataURL;
      link.click();

      setCropRect(null);
    }
  };

  const saveAsJPG = () => {
    const uri = stageRef.current.toDataURL({ mimeType: 'image/jpeg' });
    const link = document.createElement('a');
    link.download = 'annotated-image.jpg';
    link.href = uri;
    link.click();
  };

  const exportAnnotations = () => {
    const annotationData = JSON.stringify(shapes, null, 2);
    const blob = new Blob([annotationData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'annotations.json';
    link.click();
  };

  const saveCanvasAsPNG = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'annotated-canvas.png';
    link.href = uri;
    link.click();
  };

  const handleDelete = () => {
    if (selectedId) {
      setShapes(shapes.filter(shape => shape.id !== selectedId));
      setSelectedId(null);
      setTool('select');
    }
  };

  return (
    <>
      <Toolbar
        onSelectTool={setTool}
        selectedTool={tool}
        onCrop={cropAndSaveImage}
        onDelete={handleDelete}
        onLabelChange={setLabelText}
        onAddLabel={handleAddLabel}
      />

<div
  className="download-buttons"
  style={{
    backgroundColor: '#f9f9f9',
    padding: '20px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    borderRadius: '8px',
  }}
>
  <button
    style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 18px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }}
    onClick={saveAsJPG}
  >
    Download as JPG
  </button>

  <button
    style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 18px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }}
    onClick={saveCanvasAsPNG}
  >
    Save Annotated Canvas
  </button>

  <button
    style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 18px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }}
    onClick={exportAnnotations}
  >
    Export Annotations JSON
  </button>
</div>
{/* Image centered below */}
<div style={{ display: 'flex', textAlign:'center', marginTop: '10px' }}>
  <h1 style={{
    textAlign:'center',
      width: '30px',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}>ImageEditor!! 
    
    
  </h1>
</div>


      <div className="stage-wrapper">
        <Stage
          width={400}
          height={300}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
          ref={stageRef}
        >
          <Layer>
            {imageObj && <KonvaImage image={imageObj} />}
            {shapes.map((shape, i) => {
              if (shape.type === 'rectangle') {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.id === selectedId ? 'rgba(0,0,255,0.3)' : 'rgba(0,0,0,0.2)'}
                    stroke="blue"
                    draggable
                    onClick={() => setSelectedId(shape.id)}
                    onDragEnd={(e) => handleDrag(i, { x: e.target.x(), y: e.target.y() })}
                  />
                );
              } else if (shape.type === 'circle') {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.id === selectedId ? 'rgba(255,0,0,0.3)' : 'rgba(0,0,0,0.2)'}
                    stroke="red"
                    draggable
                    onClick={() => setSelectedId(shape.id)}
                    onDragEnd={(e) => handleDrag(i, { x: e.target.x(), y: e.target.y() })}
                  />
                );
              } else if (shape.type === 'label') {
                return (
                  <Text
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    fontSize={18}
                    draggable
                    fill="black"
                    onClick={() => setSelectedId(shape.id)}
                    onDragEnd={(e) => handleDrag(i, { x: e.target.x(), y: e.target.y() })}
                  />
                );
              }
              return null;
            })}
            {cropRect && (
              <Rect
                x={cropRect.x}
                y={cropRect.y}
                width={cropRect.width}
                height={cropRect.height}
                stroke="green"
                dash={[10, 5]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CanvasEditor;

