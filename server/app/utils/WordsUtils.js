'use strict';

const wordExchangeMap = {
  p: '过去式',
  d: '过去分词',
  i: '现在分词',
  3: '第三人称单数',
  r: '形容词比较级',
  t: '形容词最高级',
  s: '名词复数形式',
  0: '引源',
  1: '引源的变换形式',
};

const wordTagMap = {
  zk: '中考',
  gk: '高考',
  ky: '考研',
  gre: 'GRE',
  ielts: '雅思',
  toefl: '托福',
  cet4: 'CET 四级',
  cet6: 'CET 六级',
};

function findChapter(word) {
  return `Dictionary${word[0].toUpperCase()}`;
}

module.exports = {
  wordExchangeMap,
  wordTagMap,
  findChapter,
};
