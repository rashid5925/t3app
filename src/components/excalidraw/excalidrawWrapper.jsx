"use client";
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";

// import "@excalidraw/excalidraw/";

const ExcalidrawWrapper = ({ height, width }) => {
  console.info(convertToExcalidrawElements([{
    type: "rectangle",
    id: "rect-1",
    width: 186.47265625,
    height: 141.9765625,
  },]));
  return (
    <div style={{height: height, width: width}}>  
      <Excalidraw />
    </div> 
  );
};
export default ExcalidrawWrapper;