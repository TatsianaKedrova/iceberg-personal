import {
  APIResponse,
  AuthenticationResult,
  ClientInvite,
  UserRegistrationModel,
  LogInType,
  User,
  VerifyCodeType,
} from "./../dtos/authDTO/authentication-result.dto";
import AuthenticationService from "./AuthenticationService";

class DependentService {
  //here there is dependency injection
  constructor(private readonly authService: AuthenticationService) {}

  public async registerUser(
    model: UserRegistrationModel
  ): Promise<APIResponse<AuthenticationResult>> {
    const { data: response } = await this.authService.registerUser(model);
    return response;
  }

  public async logIn(
    loginInfo: LogInType
  ): Promise<APIResponse<AuthenticationResult>> {
    const { data: response } = await this.authService.logIn(loginInfo);
    return response;
  }

  public async getCurrentUser(): Promise<APIResponse<User>> {
    const { data: response } = await this.authService.getCurrentUser();
    return response;
  }

  public async sendVerificationCode(
    value: string
  ): Promise<APIResponse<string>> {
    const { data: response } = await this.authService.sendVerificationCode(
      value
    );
    return response;
  }

  public async verifyCode(
    value: VerifyCodeType
  ): Promise<APIResponse<boolean>> {
    const { data: response } = await this.authService.verifyCode(value);
    return response;
  }

  public async verifyIsEmailTaken(
    value: string
  ): Promise<APIResponse<boolean>> {
    const { data: response } = await this.authService.verifyIsEmailTaken(
      value
    );
    return response;
  }
  public async isClientAllowsToJoin(
    clientId: string
  ): Promise<APIResponse<boolean>> {
    const { data: response } = await this.authService.isClientAllowsToJoin(
      clientId
    );
    return response;
  }

  public async getInfoOnRegistrationInvite(
    id: string
  ): Promise<APIResponse<ClientInvite>> {
    const { data: response } =
      await this.authService.getInfoOnRegistrationInvite(id);
    return response;
  }
  public async isRegistrationWithoutInvitationAllowed(): Promise<
    APIResponse<boolean>
  > {
    const { data: response } =
      await this.authService.isRegistrationWithoutInvitationAllowed();
    return response;
  }
}

export default DependentService;
