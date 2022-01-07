import React from "react";
import { FieldError } from "react-hook-form";

type LabelFormPropsType = {
  labelName: string;
  error: FieldError | undefined;
};

const starLabel = "*";

const LabelForm: React.FC<LabelFormPropsType> = ({ labelName, error }) => {
  return (
    <>
      <span id="label">{labelName} </span>
      <span id="star" style={{ color: error ? "error.main" : "#f44336" }}>
        {starLabel}
      </span>
    </>
  );
};

export default LabelForm;
