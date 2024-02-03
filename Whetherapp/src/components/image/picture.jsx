import React from "react";
import './image.css'

export const Image = ({
  _source,_alt,_className
}) => {
  return (
      <img src={_source} alt={_alt} className={_className}/>
  );
};
