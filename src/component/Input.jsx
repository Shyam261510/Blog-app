import React, { useId } from "react";
const Input = React.forwardRef(
  function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input type={type} className={`className`} ref={ref} id={id} {...props} />
    </div>
  );
});
export default Input;
