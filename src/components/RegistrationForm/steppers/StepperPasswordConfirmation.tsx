import React from "react";
import LabelForm from "../../UI/FormComponents/LabelForm";
import PasswordInput from "../../UI/FormComponents/PasswordInput";
import { IStepperFormProps } from "../../UI/FormComponents/formTypes.types";
import { Box, Button } from "@mui/material";

const StepperPasswordConfirmation: React.FC<IStepperFormProps> = ({
  errorField,
  trigger,
  register,
  dirtyFields,
  handleNextFunction
}) => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          m: "20px 0px",
        }}
      >
        <PasswordInput
          fullWidth
          size="small"
          label={<LabelForm labelName="Password" error={errorField.password} />}
          placeholder="Enter your password here"
          error={!!errorField.password}
          onBlur={async () => await trigger("password")}
          onChange={async () => await trigger("password")}
          sx={(theme) => ({
            caretColor: errorField.password ? theme.palette.error.main : null,
            mb: "20px",
          })}
          helperText={errorField.password?.message}
          inputProps={register("password", { required: true })}
        />
        <PasswordInput
          fullWidth
          size="small"
          label={
            <LabelForm
              labelName="Password Confirmation"
              error={errorField.passwordConfirmation}
            />
          }
          placeholder="Repeat your password"
          error={!!errorField.passwordConfirmation}
          onBlur={async () => await trigger("passwordConfirmation")}
          onChange={async () => await trigger("passwordConfirmation")}
          sx={(theme) => ({
            caretColor: errorField.passwordConfirmation
              ? theme.palette.error.main
              : null,
          })}
          helperText={errorField.passwordConfirmation?.message}
          inputProps={register("passwordConfirmation", { required: true })}
        />
      </Box>
      <Button
        disabled={
          !(Object.keys(errorField).length === 0) ||
          dirtyFields?.password === undefined ||
          dirtyFields?.passwordConfirmation === undefined
        }
        variant="text"
        onClick={handleNextFunction}
      >
        Next step
      </Button>
    </>
  );
};

export default StepperPasswordConfirmation;
