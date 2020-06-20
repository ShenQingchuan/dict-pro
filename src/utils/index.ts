// 根据首字母得到单词、短语得到章节
export function findWordChapter(word: string) {
  return `Dictionary${word[0].toUpperCase()}`;
}
