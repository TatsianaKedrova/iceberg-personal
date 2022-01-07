import { useForm, SubmitHandler } from "react-hook-form";
import { formStyles } from "./formStyles.styles";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import RedirectComponent from "./RedirectComponent";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Stack } from "@mui/material";
import PasswordInput from "../UI/FormComponents/PasswordInput";
import TextInput from "../UI/FormComponents/TextInput";
import LabelForm from "../UI/FormComponents/LabelForm";
import ButtonCommon from "../commonElements/ButtonCommon";
import { LoginFormTypes } from "../UI/FormComponents/ClassValidator";
import authStore from "../../bll/auth.store";
import { LogInType } from "../../dtos/authDTO/authentication-result.dto";
import { Navigate } from "react-router-dom";

const FormBlockContainer = () => {
  const {
    getValues,
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isDirty },
  } = useForm<LoginFormTypes>({
    resolver: classValidatorResolver(LoginFormTypes),
  });

  const onSubmit: SubmitHandler<LoginFormTypes> = (data: LoginFormTypes) => {
    console.log("data: ", data);
    const { email, password } = data;
    authStore.logIn({ login: email, password } as LogInType);
  };

  //Auth Store
  const auth = authStore.authenticated;
  const isError = authStore.isError;
  console.log("auth: ", auth);
  console.log("error from server: ", isError);

  if(auth) {
   return <Navigate to="/profile" />
  }

  return (
    <Box
      component="form"
      sx={formStyles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={formStyles.textFieldContainer}>
        <TextInput
          fullWidth
          size="small"
          label={<LabelForm labelName="Email" error={errors.email} />}
          placeholder="Email"
          error={!!errors.email 
            || isError.isEmailError && true
          }
          onBlur={async () => await trigger("email")}
          onChange={async () => await trigger("email")}
          helperText={isError.isEmailError && getValues("email") && "User not found"}
          sx={(theme) => ({
            caretColor:
              errors.email && getValues("email") === ""
                ? theme.palette.error.main
                : null,
          })}
          inputProps={register("email", { required: true })}
        />
        <PasswordInput
          fullWidth
          size="small"
          label={<LabelForm labelName="Password" error={errors.password} />}
          placeholder="Password"
          error={!!errors.password
            || isError.isPasswordError && true
          }
          helperText={isError.isPasswordError && getValues("password") && "Password is incorrect"}
          onBlur={async () => await trigger("password")}
          onChange={async () => await trigger("password")}
          sx={(theme) => ({
            caretColor: errors.password ? theme.palette.error.main : null,
          })}
          inputProps={register("password", { required: true })}
        />
      </Box>
      <Stack direction="row" spacing={5}>
        <ButtonCommon
          disabled={
            !(Object.keys(errors).length === 0) ||
            isDirty === false ||
            dirtyFields.email === undefined ||
            dirtyFields.password === undefined
          }
        >
          Log in
        </ButtonCommon>
        <RedirectComponent
          actionTitle={"Forgot password?"}
          linkTo="/passwordRestore"
        />
      </Stack>
    </Box>
  );
};

const Auth = observer(FormBlockContainer);
export { Auth };
