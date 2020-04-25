export type hookSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type FormContextType = {
  isLoginForm: boolean;
  userName: string;
  password: string;
  showRegisterSuccessTip: boolean;
  setIsLoginForm: hookSetter<boolean>;
  setUserName: hookSetter<string>;
  setPassword: hookSetter<string>;
  setShowRegisterSuccessTip: hookSetter<boolean>;
};

export type UserPublicInfoType = {
  userName?: string;
  avatarUrl?: string;
  createTime?: Date;
  email?: string;
};

export type GlobalContextType = {
  tokenExists: boolean;
  setTokenExists: hookSetter<boolean>;
  userPublicInfo: UserPublicInfoType;
  setUserPublicInfo: hookSetter<UserPublicInfoType>;
};
