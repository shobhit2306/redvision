import React from "react";
import Select from "react-select";

const SelectDropdown = ({
  children,
  className = "",
  options = [],
  isSearchable = false,
  isMulti = false,
  disable = false,
  onFocus,
  value,
  ...restProps
}) => {
  const handleChange = (data) => {
    if (isMulti) {
      onValueChange?.(data?.map((d) => d.value) || []);
    }
  };

  return (
    <>
      <div className="relative w-full bg-white rounded-md border-2 h-11 border-gray">
        <Select
          options={options}
          className={`${className} flex rounded-md`}
          isSearchable={isSearchable}
          isDisabled={disable}
          isMulti={isMulti}
          onFocus={onFocus}
          onChange={handleChange}
          value={value}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            container: (provided) => ({
              ...provided,
              zIndex: 0,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "0 !important",
              boxShadow: "0 !important",
              minHeight: "auto",
              width: "100%",
              "&:hover": {
                border: "0 !important",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "inherit",
              paddingLeft: icon ? "40px" : "10px",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected && "#0957de",
              color: state.isSelected && "#ffffff",
              "&:hover": {
                backgroundColor: "#0957de",
                color: "#ffffff",
              },
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
              fontFamily: "Nunito",
              fontSize: "16px",
              fontWeight: 400,
              backgroundColor: "#fff",
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
              fontSize: "16px",
              fontFamily: "poppins",
              paddingLeft: "10px",
              fontWeight: 400,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 999999 }),
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event) => {
            return event.target.id === "scrollContainer";
          }}
          {...restProps}
        />
        {children}
      </div>
    </>
  );
};

export { SelectDropdown };
