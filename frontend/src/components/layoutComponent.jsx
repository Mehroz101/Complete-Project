import React from "react";

export const FormRow = ({ children, className = "" }) => {
  return <div className={`grid ${className}`}>{children}</div>;
};

export const FormColumn = ({
  children,
  className = "",
  xs = 12,
  sm = 12,
  md = 12,
  lg = 12,
  xl = 12,
  ...props
}) => {
  const responsiveClass = `col-${xs} sm:col-${sm} md:col-${md} lg:col-${lg} xl:col-${xl}`;
  const combinedClass = `${responsiveClass} ${className}`.trim();

  return (
    <div {...props} className={combinedClass}>
      {children}
    </div>
  );
};

export const FormLabel = ({ children, className = "", labelFor = "" }) => {
  return (
    <label
      className={"text-md font-semibold " + className}
      htmlFor={labelFor === "" ? children : labelFor}
      id={labelFor === "" ? children : labelFor + "_label"}
    >
      {children}
    </label>
  );
};

export const FormField = ({
  col = "12",
  label = "",
  showSteric = false,
  inputTemplate,
}) => {
  return (
    <>
      <FormColumn className={`col-${col}`}>
        <FormLabel>
          {label}
          {showSteric && (
            <>
              <span className="text-red-700 fw-bold ">*</span>
            </>
          )}
        </FormLabel>
        {inputTemplate}
      </FormColumn>
    </>
  );
};
