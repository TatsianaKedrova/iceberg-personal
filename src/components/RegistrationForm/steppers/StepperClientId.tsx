import React from "react";
import { IStepperFormProps } from "../../UI/FormComponents/formTypes.types";
import LabelForm from "../../UI/FormComponents/LabelForm";
import TextInput from "../../UI/FormComponents/TextInput";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useQuery } from "react-query";
import { dependentService } from "../../../data-services/index";
import authStore from "../../../bll/auth.store";
import { Navigate } from "react-router-dom";

const regexClientId =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const StepperClientId: React.FC<IStepperFormProps> = ({
  errorField,
  register,
  trigger,
  inputValue,
}) => {
  let isClientAllowsToJoin = useQuery(
    ["isClientAllowsToJoin", inputValue],
    async () => {
      console.log("input value: ", inputValue);

      if (inputValue) {
        console.log("we are inside if statement");
        const response = await dependentService.isClientAllowsToJoin(
          inputValue
        );
        return response;
      }
    },
    { enabled: !!inputValue?.match(regexClientId) }
  );

  console.log("isAuthenticated", authStore.isAuthenticated);
  
  if(authStore.isAuthenticated) {
    <Navigate to={"/login"}/>
  }

  const loadingIcon = (
    <InputAdornment position="end">
      <CircularProgress disableShrink sx={{ marginBottom: "5px" }} size={30} />
    </InputAdornment>
  );

  return (
    <>
      <TextInput
        fullWidth
        size="small"
        label={<LabelForm labelName="Client Id" error={errorField.clientIdToJoin} />}
        placeholder="Enter an Id of a client you weant to join"
        error={
          !!errorField.clientIdToJoin || isClientAllowsToJoin.data?.data === false
        }
        onBlur={async () => await trigger("clientIdToJoin")}
        helperText={
          errorField.clientIdToJoin?.message ||
          isClientAllowsToJoin.data?.data === false && "No available clients with such id"
        }
        sx={(theme) => ({
          caretColor: errorField.clientIdToJoin ? theme.palette.error.main : null,
        })}
        inputProps={register("clientIdToJoin", {
          required: true,
          validate: async (value) => {
            console.log("validate value: ", value);
            console.log("inside validate function");
            return (await isClientAllowsToJoin.data?.data) === true;
          },
        })}
        endAdornment={isClientAllowsToJoin.isLoading && loadingIcon}
      />
      <Box sx={{ m: "20px 0px" }}>
        <Button
          disabled={
            !inputValue ||
            !!errorField.clientIdToJoin === true ||
            isClientAllowsToJoin.isLoading === true ||
            isClientAllowsToJoin.data?.data === false
          }
          type="submit"
        >
          Finish
        </Button>
      </Box>
    </>
  );
};

export default StepperClientId;
