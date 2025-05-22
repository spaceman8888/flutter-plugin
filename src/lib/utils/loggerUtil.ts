import { now, uniqueId, isObject, isObjectLike, isBoolean, isString } from 'lodash-es';

type TLoggerUtil = {
  info: (msg: string, obj?: unknown) => void;
  warn: (msg: string, obj?: unknown) => void;
  error: (msg: string, obj?: unknown) => void;
  time: (key: string) => void;
  timeEnd: (key: string) => void;
};

type TStyle = {
  info: string;
  warn: string;
  error: string;
};

const levels = {
  Error: 0,
  Warn: 1,
  Info: 2,
};

Object.freeze(levels);

const styles: TStyle = {
  info: ['color: green', 'background: white', 'font-size: 13px', 'border: 1px solid gray', 'padding: 2px'].join(';'),

  warn: ['color: yellow', 'background: yellow', 'font-size: 13px', 'border: 1px solid gray', 'padding: 2px'].join(';'),

  error: ['color: red', 'background: red', 'font-size: 13px', 'border: 1px solid red', 'padding: 2px'].join(';'),
};

const level: number = 2;
const timeMap: Map<string, number> = new Map();

const printLog = function (msg: string, obj: unknown, style: string) {
  if (isObject(obj) || isBoolean(obj) || isString(obj)) {
    const unique = uniqueId();

    console.group(unique);
    console.log(`%c ${msg}`, style);
    console.log(obj);
    console.groupEnd();
  } else if (isObjectLike(msg)) {
    console.log(msg);
  } else {
    console.log(`%c ${msg}`, style);
  }
};

const info = function (msg: string, obj?: unknown) {
  if (level <= levels.Info) {
    printLog(msg, obj, styles.info);
  }
};

const warn = function (msg: string, obj?: unknown) {
  if (level <= levels.Warn) {
    printLog(msg, obj, styles.info);
  }
};

const error = function (msg: string, obj: unknown) {
  if (level <= levels.Error) {
    printLog(msg, obj, styles.info);
  }
};

const time = function (key: string) {
  timeMap.set(key, now());
};

const timeEnd = function (key: string) {
  const value = timeMap.get(key);
  if (!value) {
    warn(`${key} 값이 없습니다.`);
    return;
  }
  info(`${(now() - value) / 1000}`);
};

const loggerUtil: TLoggerUtil = {
  info,
  warn,
  error,
  time,
  timeEnd,
};

export default loggerUtil;
