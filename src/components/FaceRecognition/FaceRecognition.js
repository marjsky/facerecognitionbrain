import React from "react";

const FaceRecognition = ({imageUrl}) => {
  //console.log("Face-Recog", imageUrl);
  return (
    <div className="center">
      <div className="absolute mt2">
        <img alt="" src={imageUrl} width='500px' height='auto' />
      </div>
    </div>
  );
};

export default FaceRecognition;
