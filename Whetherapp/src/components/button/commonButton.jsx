import React from "react";
import './button.css';

const CommonButton = ({ _type, _function, _content }) => {
  return (
    <button type={_type} onClick={_function}>
      {_content}
    </button>
  );
};

export default CommonButton;
