export interface IRegister {
  firstName: string;
  lastName: string;
  username: string;
  businessName: string;
}

export interface IActivateAccount {
  password: string;
  activationKey: string;
}

export interface IPasswordResetRequest {
  username: string;
}

export interface IPasswordReset {
  password: string;
  resetKey: string;
}

export interface IPasswordChange {
  username: string;
  currentPassword: string;
  password: string;
}