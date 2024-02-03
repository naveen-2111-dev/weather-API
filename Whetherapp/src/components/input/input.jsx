import React from "react";
import './input.css';

export const InputField = ({
  _type,
  _value,
  _placeholder,
  _function,
  _classname,
}) => {
  return (
    <input
      type={_type}
      value={_value}
      placeholder={_placeholder}
      className={_classname}
      onChange={_function}
    />
  );
};