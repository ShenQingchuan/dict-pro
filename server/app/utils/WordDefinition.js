'use strict';

const { Required, Unique, StringType, NumberType, SetDefault, t } = require('./SchemaTypes');

const WordDefinition = {
  id: Required(Unique(t(NumberType))), // ecdict id
  sw: Required(Unique(t(StringType))), // 模糊匹配词
  word: Required(Unique(t(StringType))), // 词条原文
  phonetic: SetDefault(t(StringType), ''), // 音标
  definition: SetDefault(t(StringType), ''), // 英文释义
  translation: Required(t(StringType)), // 中文翻译
  pos: SetDefault(t(StringType), ''), // 词语位置
  collins: SetDefault(t(NumberType), 0), // 柯林斯星级
  oxford: SetDefault(t(NumberType), 0), // 是否牛津核心三千词
  tag: SetDefault(t(StringType), ''), // 字符串标签：zk/中考，gk/高考，cet4/四级, ky/考研 等等标签，空格分割
  bnc: SetDefault(t(NumberType), 0), // 英国国家语料库词频顺序
  frq: SetDefault(t(NumberType), 0), // 当代语料库词频顺序
  exchange: SetDefault(t(StringType), ''), // 时态复数等变换，使用 "/" 分割不同项目，见后面表格
  detail: t(StringType), // json 扩展信息，字典形式保存例句（待添加）
  audio: t(StringType), // 读音音频 url（待添加）
};

module.exports = WordDefinition;
