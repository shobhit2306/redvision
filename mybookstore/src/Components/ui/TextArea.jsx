import React from "react";

const TextArea = ({
  className = "",
  name = "",
  placeholder = "",
  onChange,
  onFocus,
  isDisabled,
  maxlength = "2500",
  value,
  ...restProps
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <>
      <textarea
        className={`${className} rounded-md p-4`}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={isDisabled}
        onFocus={onFocus}
        maxLength={maxlength}
        value={value}
        {...restProps}
      />
    </>
  );
};

export { TextArea };
