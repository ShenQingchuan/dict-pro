export type hookSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type UserPublicInfoType = {
  userName?: string;
  avatarUrl?: string;
  createTime?: Date;
  email?: string;
};
export type WordQueryResult = {
  id: number; // ecdict id
  sw: string; // 模糊匹配词
  word: string; // 词条原文
  phonetic: string; // 音标
  definition: [string]; // 英文释义
  translation: [string]; // 中文翻译
  pos: string; // 词语位置
  collins: number; // 柯林斯星级
  oxford: number; // 是否牛津核心三千词
  tag: string | [string]; // 字符串标签：zk/中考，gk/高考，cet4/四级, ky/考研 等等标签，空格分割
  bnc: number; // 英国国家语料库词频顺序
  frq: number; // 当代语料库词频顺序
  exchange: [string]; // 时态复数等变换，使用 "/" 分割不同项目，见后面表格
  detail: string | null; // json 扩展信息，字典形式保存例句（待添加）
  audio: string; // 读音音频 url（待添加）
};

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
