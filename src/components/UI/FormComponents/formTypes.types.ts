import {
  APIResponse,
} from "./../../../dtos/authDTO/authentication-result.dto";
import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import { UseMutationResult } from "react-query";
import { FormInputsValidation } from "./ClassValidator";
import { AxiosResponse } from "axios";

export interface IRegistrationFormValues {
  email: string;
  firstName: string;
  lastName: string;
  emailVerificationCode: string;
  password: string;
  passwordConfirmation: string;
  clientIdToJoin: string;
}

export interface IStepperFormProps {
  errorField: FieldErrors<FormInputsValidation>;
  trigger: UseFormTrigger<FormInputsValidation>;
  register: UseFormRegister<FormInputsValidation>;
  inputValue?: string | undefined;
  isDirty?: boolean;
  dirtyFields?: FieldNamesMarkedBoolean<IRegistrationFormValues>;
  handleNextFunction: () => void;
  mutationResult?: UseMutationResult<
    AxiosResponse<APIResponse<boolean>, any> | undefined,
    unknown,
    void,
    unknown
  >;
}
