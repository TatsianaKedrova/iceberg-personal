export type APIResponse<D> = {
  status: string;
  data: D;
};

export type LogInType = {
  login: "string";
  password: "string";
};

export type VerifyCodeType = {
  email: "string";
  code: "string";
};

export type UserRegistrationModel = {
  email: string;
  firstName: string;
  lastName: string;
  emailVerificationCode: string;
  password: string;
  passwordConfirmation: string;
  clientCreationNeeded: boolean;
  newClientName: string;
  clientIdToJoin: string;
  inviteId: string;
};


type ModelBasic<D> = {
  deletedAt: string;
  deletedByUserId: string;
  deletedByUser: D;
};

type UserModel = ModelBasic<User | {}> & {
  createdAt: string;
  createdByUserId: string;
  updatedAt: string;
  updatedByUserId: string;
};

type UserModelExtended = UserModel & {
  createdByUser: User;
  updatedByUser: User;
};

export type User = ModelBasic<{}> & {
  id: string;
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  isGlobalAdmin: boolean;
  pictureId: string;
  fullName: string;
  rolesOnClients: any;
  invites: any;
  picture: any;
};

export type AuthenticationResult = {
  token: string;
  user: User;
};

export type RequestResultType = {
  id: string;
  name: string;
  requestsOfType: [ClientAccessRequest];
} & ModelBasic<User>;

export type UserRole = {
  id: string;
  name: string;
};

export type ClientAccessRequest = UserModelExtended & {
  id: string;
  requestedByUserId: string;
  requestedUserCurrentRoleId: string;
  clientId: string;
  requestedNewRoleId: string;
  requestedAt: string;
  reviewedByUserId: string;
  reviewedAt: string;
  resultTypeId: string;
  resultedUserClientRoleId: string;
  reviewNote: string;
  requestedByUser: User;
  requestedUserCurrentRole: UserRole;
  client: Client;
  requestedNewRole: UserRole;
  reviewedByUser: User;
  resultType: RequestResultType;
  resultedUserClientRole: UserClientRole;
};

export type Client = UserModelExtended & {
  id: string;
  name: string;
  description: string;
  defaultScheduleVariantId: string;
  actualSchedulingSettingsId: string;
  defaultScheduleVariant: any;
  actualSchedulingSettings: any;
  clientUsersRoles: any;
  joinRequests: any;
  invites: any;
  actionLogs: any;
  exportJobs: any;
  allSchedulingSettings: any;
};

export type UserClientRole = UserModelExtended & {
  id: string;
  userId: string;
  clientId: string;
  userRoleId: string;
  requestId: string;
  user: User;
  client: Client;
  userRole: UserRole;
  accessRequest: ClientAccessRequest;
  clientInvite: ClientInvite;
};

export type ClientInvite = UserModelExtended & {
  id: string;
  email: string;
  invitedUserId: string;
  invitationMessage: string;
  suggestedRoleId: string;
  clientId: string;
  expirationDateTime: string;
  resultedUserClientRoleId: string;
  usedAt: string;
  invitedUser: User;
  suggestedRole: UserRole;
  client: Client;
  resultedUserClientRole: UserClientRole;
};
