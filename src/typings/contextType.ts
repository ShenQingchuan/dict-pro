import { hookSetter, UserPublicInfoType, WordQueryResult } from "./shared";

/* ----------- 上下文 Context 的类型定义 ------------*/
export type GlobalContextType = {
  tokenExists: boolean;
  setTokenExists: hookSetter<boolean>;
  userPublicInfo: UserPublicInfoType;
  setUserPublicInfo: hookSetter<UserPublicInfoType>;
};
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
export type HomeContextType = {
  queryResult: WordQueryResult;
  setQueryResult: hookSetter<WordQueryResult>;
};
/* -------------- Context 类型定义 END ------------ */
