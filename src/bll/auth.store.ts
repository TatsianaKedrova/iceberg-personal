import { authService } from "./../data-services/index";
import { action, makeAutoObservable } from "mobx";
import {
  LogInType,
  User,
  UserRegistrationModel,
} from "../dtos/authDTO/authentication-result.dto";
import { AxiosError } from "axios";

type isServerError = {
  isEmailError: boolean;
  isPasswordError: boolean;
};

export class AuthStore {
  authenticated: boolean = false;
  newUser: User | null = null;
  isError: isServerError = { isEmailError: false, isPasswordError: false };

  constructor() {
    makeAutoObservable(this);
  }

  @action
  public registerUser = async (model: UserRegistrationModel) => {
    try {
      const response = await authService.registerUser(model);
      if (response.data.data.token) {
        console.log("We got a token and user is registered!!!");
        this.newUser = response.data.data.user;
        console.log("token: ", response.data.data.token);
        console.log("new user: ", this.newUser);

        return response;
      } else {
        console.log("Some error occured!!!");
      }
    } catch (error) {
      console.log(new Error(JSON.stringify(error)));
    }
  };

  @action
  public logIn = async (loginInfo: LogInType) => {
    try {
      const response = await authService.logIn(loginInfo);
      console.log("server: ", response.data);

      if (response.data.status === "success") {
        console.log("successful authentication");
        this.authenticated = true;
      }
    } catch (error: any) {
      //  const errorAxios = error as AxiosError
      if (
        error.response.data.errorDetails.fieldSpecificMessages.email !==
        undefined
      ) {
        this.isError.isEmailError = true;
      } else if (
        error.response.data.errorDetails.fieldSpecificMessages.password !==
        undefined
      ) {
        this.isError.isPasswordError = true;
      }
      console.log(
        "error response messages: ",
        error.response.data.errorDetails.fieldSpecificMessages.email
      );
      console.log(
        "error response data password: ",
        error.response.data.errorDetails.fieldSpecificMessages.password
      );

      console.log(new Error(JSON.stringify(error)));
    }
  };

  // @computed
  get isAuthenticated() {
    return this.authenticated;
  }
}

const authStore = new AuthStore();
export default authStore;
