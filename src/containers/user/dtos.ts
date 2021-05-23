export interface IUser {
  name: string;
  mail: string;
}

export interface IState {
  loading: boolean;
  error: null | string;
  user: IUser | null;
}

export interface ILoginUser {
  mail: string;
  password: string;
}

export interface IRegisterUser extends IUser {
  password: string;
}

export interface IUserResponse extends IUser {
  id: string;
  token: string;
}

export interface IActions {
  makeLogin(data: ILoginUser): Promise<void>;
  makeRegister(data: IRegisterUser): Promise<void>;
  makeLogout(): void;
  getUser(): Promise<void>;
  resetError(): void;
}
