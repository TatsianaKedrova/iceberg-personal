import { action, computed, makeObservable, observable } from "mobx";
import AuthenticationService from "../data-services/AuthenticationService";
import { APIResponse, User } from "../dtos/authDTO/authentication-result.dto";

export class UserStore {
  @observable private accessToken: string | null = null;
  @observable private userInfo: APIResponse<User> | null = null;

  constructor(private readonly authService: AuthenticationService) {
    makeObservable(this);
    this.setToken(localStorage.getItem("token"));
  }

  @action("tokenHandler")
  public setToken = async (token: string | null): Promise<void> => {
    if (token) {
      localStorage.setItem("token", token);
      this.accessToken = token;
      await this.refreshUserData();
    } else {
      this.removeToken();
    }
  };

  @action
  public removeToken = (): void => {
    localStorage.removeItem("token");
    this.accessToken = null;
    this.removeUserInfo();
  };

  @action
  public setUserInfo = (user: APIResponse<User>): void => {
    this.userInfo = user;
  };

  @action
  private refreshUserData = async (): Promise<APIResponse<User>> => {
    const { data: userData } = await this.authService.getCurrentUser();
    this.setUserInfo(userData);
    return userData;
  };

  @action
  public removeUserInfo = (): void => {
    localStorage.removeItem("userInfo");
    this.userInfo = null;
  };

  @computed
  get token() {
    return this.accessToken;
  }

  @computed
  get user() {
    return this.userInfo;
  }
}
