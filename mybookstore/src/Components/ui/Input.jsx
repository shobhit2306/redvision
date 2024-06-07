import React from "react";

const Input = ({
  wrapClassName = "",
  className = "",
  name = "",
  placeholder = "",
  type = "text",
  label = "",
  onChange,
  disable,
  value,
  ...restProps
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className={`${wrapClassName} rounded-md w-full`}>
      {label && <label>{label}</label>}
      <input
        className={`${className} bg-transparent border-0`}
        type={type}
        name={name}
        value={value}
        disabled={disable}
        onChange={handleChange}
        placeholder={placeholder}
        onWheel={(e) => e.target.blur()}
        {...restProps}
      />
    </div>
  );
};

export { Input };
