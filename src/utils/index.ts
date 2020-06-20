import { message } from "antd";
import { useRef, useEffect, useCallback } from "react";

// 根据首字母得到单词、短语得到章节
export function findWordChapter(word: string) {
  return `Dictionary${word[0].toUpperCase()}`;
}

export function useDebounce(fn: Function, delay: number, immediate = false) {
  const { current } = useRef<{
    fn: Function;
    timer: NodeJS.Timeout | null;
  }>({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [current.fn, fn]
  );

  return useCallback(
    function (this: any, ...args) {
      console.log(immediate);
      if (current.timer) {
        current.timer = null;
        message.warning("本站服务器承受力有限，请勿操作过快！", 1);
      }
      if (immediate && !current.timer) {
        current.timer = setTimeout(() => {
          current.timer = null;
        }, delay);
        current.fn.call(this, ...args);
      } else {
        current.timer = setTimeout(() => {
          current.fn.call(this, ...args);
          current.timer = null;
        }, delay);
      }
    },
    [current.fn, current.timer, delay, immediate]
  );
}

export function useThrottle(fn: Function, delay: number) {
  const { current } = useRef<{
    fn: Function;
    timer: number | undefined;
  }>({ fn, timer: undefined });
  useEffect(
    function () {
      current.fn = fn;
    },
    [current.fn, fn]
  );

  return useCallback(
    function f(this: any, ...args: any[]) {
      if (!current.timer) {
        current.timer = window.setTimeout(() => {
          delete current.timer;
        }, delay);
        current.fn.call(this, ...args);
      }
    },
    [current.fn, current.timer, delay]
  );
}
