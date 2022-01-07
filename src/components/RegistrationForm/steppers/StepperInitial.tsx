import { Box, Button, InputAdornment } from "@mui/material";
import { IStepperFormProps } from "../../UI/FormComponents/formTypes.types";
import LabelForm from "../../UI/FormComponents/LabelForm";
import TextInput from "../../UI/FormComponents/TextInput";
import CircularProgress from "@mui/material/CircularProgress";
import { dependentService } from "../../../data-services";

let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const StepperInitial: React.FC<IStepperFormProps> = ({
  mutationResult,
  errorField,
  dirtyFields,
  handleNextFunction,
  isDirty,
  trigger,
  register,
  inputValue,
}) => {

  const verifyEmailIsTaken = (onChangeValue?: string) => {
    if (onChangeValue?.match(regexEmail)) {
      console.log("regex function");
      console.log(isDirty);
      // !!errorField.email === false
      const response = mutationResult?.mutate();
    
    }
  };

  // const verifyEmailIsTaken = () => {
  //   console.log("we are inside validation function");
  //   if(inputValue?.match(regexEmail)) {
  //     const response = mutationResult?.mutate();
  //     console.log("response: ", response);
  //     return true;
  //   }
  // };

  const isEmailTakenError = () => {
    if (mutationResult?.data !== undefined) {
      if (mutationResult?.data?.data) {
        return true;
      }
    }
  };

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
        label={<LabelForm labelName="Email" error={errorField?.email} />}
        placeholder="Please enter your email here"
        error={!!errorField.email || isEmailTakenError()}
        onBlur={async () => await trigger("email")}
        // onChange={async (e) => {
        //  await verifyEmailIsTaken(e.target.value);
        // }}
        helperText={
          errorField.email?.message ||
          (mutationResult?.data?.data.data === true && "Email is already in use")
        }
        sx={(theme) => ({
          caretColor: errorField.email ? theme.palette.error.main : null,
        })}
        inputProps={register("email", {
          validate: {
            isEmailTakenValidate: async (v) => await (await dependentService.verifyIsEmailTaken(v)).data === true,
          },
        })}
        endAdornment={mutationResult?.isLoading && loadingIcon}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          m: "20px 0px",
        }}
      >
        <div style={{ marginRight: "5px" }}>
          <TextInput
            fullWidth
            size="small"
            label={
              <LabelForm labelName="First Name" error={errorField.firstName} />
            }
            helperText={errorField.firstName?.message}
            placeholder="Please enter your firstname here"
            error={!!errorField.firstName}
            onBlur={async () => await trigger("firstName")}
            sx={(theme) => ({
              caretColor: errorField.firstName
                ? theme.palette.error.main
                : null,
            })}
            inputProps={register("firstName", { required: true })}
          />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <TextInput
            fullWidth
            size="small"
            label={
              <LabelForm labelName="Last Name" error={errorField.lastName} />
            }
            placeholder="Please enter your lastname here"
            error={!!errorField.lastName}
            onBlur={async () => await trigger("lastName")}
            helperText={errorField.lastName?.message}
            sx={(theme) => ({
              caretColor: errorField.lastName ? theme.palette.error.main : null,
            })}
            inputProps={register("lastName", { required: true })}
          />
        </div>
      </Box>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            disabled={
              !(Object.keys(errorField).length === 0) ||
              isDirty === false ||
              dirtyFields?.email === undefined ||
              dirtyFields.firstName === undefined ||
              dirtyFields?.lastName === undefined ||
              mutationResult?.isLoading === true
            }
            variant="text"
            onClick={handleNextFunction}
          >
            Next step
          </Button>
        </div>
      </Box>
    </>
  );
};

export default StepperInitial;
