import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Controller } from "react-hook-form";

function TextInput({
  Label = "",
  ID,
  control,
  required,
  focusOptions,
  isEnable = true,
  floatLabel = false,
  onChange,
  type = "text",
  placeHolder = "",
  errorMessage = "This field is required!",
  showErrorMessage = true,
  autoFocus = false,
  ...options
}) {
  return (
    <>
      <Controller
        name={ID}
        control={control}
        rules={{ required }}
        render={({ field, fieldState }) => (
          <>
            <label htmlFor={field.name}>{Label}</label>
            <span className={floatLabel ? "p-float-label" : ""}>
              <InputText
                autoFocus={autoFocus}
                disabled={!isEnable}
                id={field.name}
                value={field.value}
                ref={field.ref}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (onChange) {
                    onChange(e);
                  }
                }}
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
                pt={{
                  root: {
                    style: { padding: "0.6rem 0.4rem", fontSize: ".9em" },
                  },
                }}
                onKeyDown={(e) => {
                  if (focusOptions) {
                    if (e.key === "Enter") {
                      focusOptions();
                    }
                  }
                }}
                className={classNames({
                  "p-invalid": fieldState.error,
                })}
                autoComplete="off"
                type={type}
                {...options}
                placeholder={placeHolder}
              />
              {showErrorMessage && (
                <>
                  <span className="text-red-700 text-sm">
                    {fieldState.error ? errorMessage : ""}
                  </span>
                </>
              )}
            </span>
          </>
        )}
      />
    </>
  );
}

export default TextInput;
