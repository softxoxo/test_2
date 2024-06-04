import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, RegularPolygon, Transformer } from 'react-konva';
import './App.css';

const App: React.FC = () => {
  const stageRef = useRef<any>(null);
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [shapes, setShapes] = useState<any[]>([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);

  const handleAddShape = () => {
    if (selectedShape) {
      const newShape = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        type: selectedShape,
      };
      setShapes([...shapes, newShape]);
    }
  };

  const handleStageMouseDown = (event: any) => {
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShapeIndex(null);
    }
  };

  const handleShapeSelect = (index: number) => {
    setSelectedShapeIndex(index);
  };
  return (
    <div className="app">
      <div className="toolbar">
        <select
          className="shape-select"
          value={selectedShape}
          onChange={(e) => setSelectedShape(e.target.value)}
        >
          <option value="">Select a shape</option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
        <button className="add-shape-button" onClick={handleAddShape}>
          Add Shape
        </button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageMouseDown}
        draggable
        className="canvas"
      >
        <Layer>
          {shapes.map((shape, index) => {
            switch (shape.type) {
              case 'rectangle':
                return (
                  <Rect
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    width={50}
                    height={50}
                    fill="red"
                    draggable
                    onClick={() => handleShapeSelect(index)}
                  />
                );
              case 'circle':
                return (
                  <Circle
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    radius={25}
                    fill="blue"
                    draggable
                    onClick={() => handleShapeSelect(index)}
                  />
                );
              case 'triangle':
                return (
                  <RegularPolygon
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    sides={3}
                    radius={25}
                    fill="green"
                    draggable
                    onClick={() => handleShapeSelect(index)}
                  />
                );
              default:
                return null;
            }
          })}
          {selectedShapeIndex !== null && (
            <Transformer
              nodes={[stageRef.current.findOne(`.${shapes[selectedShapeIndex].type}-${selectedShapeIndex}`)]}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;