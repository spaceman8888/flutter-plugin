import { has, isEmpty } from 'lodash-es';
import loggerUtil from '@/lib/utils/loggerUtil';
import { IDFormat, makeUUID } from '@/lib/utils/uuidUtil';
import { DevicePluginResponseType } from './device/types';
import { PLUGIN_ERROR_CODES } from '@/constants/pluginErrors';
import { MobBridge, MobBridgeLg, PluginResponse, PluginRequest } from './types';

const mobBridge: MobBridge = {
  lg: {} as MobBridgeLg,
};

/**
 * 네이티브로 실행할 함수의 콜백 아이디
 */
mobBridge.lg.callbackID = Math.floor(Math.random() * 2000000000);

/**
 * 실행한 함수가 콜백을 실행하기 전까지, 콜백 저장
 */
mobBridge.lg.callbacks = {};

/**
 * 디바이스 체크
 */
mobBridge.lg.isMobile = {
  isMobile: () => {
    return navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) !== null;
  },
  android: function () {
    return navigator.userAgent.match(/Android/i) === null ? false : true;
  },
  ios: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) === null ? false : true;
  },
  androidWebview: function () {
    return navigator.userAgent.match(/AppDroid/i) === null ? false : true;
  },
  iosWebview: function () {
    return navigator.userAgent.match(/IosApp/i) === null ? false : true;
  },
  any: function () {
    return this.android() || this.ios();
  },
  osType: '',
};

/**
 * command: flutter plugin 호출
 */
mobBridge.lg.command = function (
  callbackID: string,
  service: string,
  action: string,
  params: unknown
) {
  console.log('mobBridge.lg.command!!!!!!@@@@@@@@@@@@@@');
  console.log('callbackID', callbackID);
  console.log('service', service);
  console.log('action', action);
  console.log('params', params);

  const strCallbackID = callbackID.toString();
  const message = {
    callbackID: strCallbackID,
    service: service,
    action: action,
    params: params,
  };

  const messageString = JSON.stringify(message);

  console.log('isFlutterInAppWebViewReady@@@@@@@@@@@@@@.');
  /**
   * web -> native로 JSON Data 전송
   */
  try {
    if (window.flutter_inappwebview?.callHandler) {
      window.flutter_inappwebview.callHandler('flutterHandler', messageString);
    } else {
      throw new Error('Flutter InAppWebView가 초기화되지 않았거나 사용할 수 없습니다');
    }
  } catch (error) {
    loggerUtil.error('Flutter 메시지 전송 실패', error);
    // 필요한 경우 실패 콜백 호출 또는 추가 에러 처리
  }
};

/**
 * web -> android / ios 실행
 */
mobBridge.lg.exec = function (
  successCallback: (
    paramObj: PluginResponse,
    respObject: DevicePluginResponseType | object
  ) => void,
  failCallback: (paramObj: PluginResponse, respObject: DevicePluginResponseType | object) => void,
  callbackID: string,
  service: string,
  action: string,
  params: unknown
) {
  console.log('[mobBridge.lg.exec =========== start]');

  if (!mobBridge.lg.isMobile.any()) {
    console.log('[mobBridge.lg.exec =========== 웹에서 실행할 수 없습니다. ]');
    return;
  }

  // callbacks
  if (successCallback || failCallback) {
    mobBridge.lg.callbacks[callbackID] = {
      className: service,
      command: action,
      success: successCallback,
      fail: failCallback,
      params: params,
    };
  }

  try {
    if (mobBridge.lg.isMobile.isMobile()) {
      console.log('[mobBridge.lg.exec ===========]', 'mobile');
      console.log('@@@mobBridge.lg.command@@@', mobBridge.lg.command);
      mobBridge.lg.command(callbackID, service, action, params);
    } else {
      console.log('[mobBridge.lg.exec ===========]', 'web');

      const strCallbackID = callbackID.toString();
      const message = {
        callbackID: strCallbackID,
        className: service,
        command: action,
        params: params,
      };

      loggerUtil.error(' mobBridge.lg.exec ::::: message : ', JSON.stringify(message, null, 4));
    }
  } catch (e) {
    loggerUtil.error('mobBridge.lg.exec Error: ', e);
  }
};

// * plugin success/fail callback
function callbackListener(respObject: PluginResponse) {
  console.log('callbackListener@@@@@@@@@@@@@@.');
  // alert(respObject); 디버깅 용

  const safeParse = (data: unknown) => {
    try {
      return JSON.parse(data as string);
    } catch (e) {
      console.error('Invalid JSON data:', e);
      return data;
    }
  };

  // respObject가 문자열로 전달되었을 경우 파싱
  const respObjectData = typeof respObject === 'string' ? safeParse(respObject) : respObject;
  const paramObj = isEmpty(respObjectData.params)
    ? respObjectData
    : typeof respObjectData.params === 'string'
      ? safeParse(respObjectData.params || '{}')
      : respObjectData.params;

  if (
    respObjectData.errorCode === PLUGIN_ERROR_CODES.CMM00 ||
    respObjectData.errorCode === PLUGIN_ERROR_CODES.CMM01
  ) {
    mobBridge.lg.callbacks[respObjectData.callbackID].success(respObjectData, paramObj);
  } else {
    mobBridge.lg.callbacks[respObjectData.callbackID].fail(respObjectData, paramObj);
  }
}

// * plugin child 웹뷰 open callback
function multiWebViewDataCallbackListener(message: unknown) {
  console.log('&&&&&&& multiWebViewDataCallbackListener &&&&&&&');
  console.log(message);
}

// * plugin parent 웹뷰 open/close callback
function multiWebviewCloseCallbackListener(message: unknown) {
  console.log('&&&&&&& multiWebviewCloseCallbackListener &&&&&&&');
  console.log(message);
  try {
    if (typeof window.$$CloseWebviewCallback === 'function') {
      window.$$CloseWebviewCallback(message);
      setMultiwebviewCloseFunction(undefined); // callback 실행 후 초기화
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
}

export const setMultiwebviewCloseFunction = (func?: (message: unknown) => void) => {
  console.log('&&&&&&& setMultiwebviewCloseFunction &&&&&&&');
  if (typeof func === 'function') {
    window.$$CloseWebviewCallback = func;
  } else {
    window.$$CloseWebviewCallback = undefined;
    loggerUtil.error('setMultiwebviewCloseFunction fail');
  }
};

window.callbackListener = callbackListener;
window.multiWebViewDataCallbackListener = multiWebViewDataCallbackListener;
window.multiWebviewCloseCallbackListener = multiWebviewCloseCallbackListener;
window.mobBridge = mobBridge;

export type CallbackType = {
  [key: string]: object;
};

const callbacks: CallbackType = {};

const makeCallbackId = (command: PluginRequest) => {
  return makeUUID(`${command.service}.${command.action}`, IDFormat.NATIVE_REQUEST_ID);
};

/**
 * callbacks 내 해당 id를 가진 객체를 제거함
 * @param id
 */
const removeCallback = (id: string) => {
  if (has(callbacks, id)) {
    delete callbacks[id];
  }
};

const PLUGIN_TIMEOUT = 10000;

/**
 * 플러그인 호출: 핵심 로직
 */
export const callPlugin = (
  command: PluginRequest & {
    success: (paramObj: PluginResponse, respObject: DevicePluginResponseType | object) => void;
    fail: (paramObj: PluginResponse, respObject: DevicePluginResponseType | object) => void;
  }
) => {
  if (!command.callbackID) {
    command.callbackID = makeCallbackId(command);
  }

  const callbackID = command.callbackID ?? '';
  removeCallback(callbackID); //기존 callbacks 내 동일한 id가 있을 경우 제거함

  const timeoutId = setTimeout(() => {
    const timeoutResponse: PluginResponse = {
      callbackID,
      errorCode: PLUGIN_ERROR_CODES.CMM04,
      errorMessage: PLUGIN_ERROR_CODES.CMM04,
    };

    if (command.fail) {
      command.fail(timeoutResponse, timeoutResponse);
    }

    removeCallback(callbackID);
  }, PLUGIN_TIMEOUT);

  const wrappedSuccess = (
    paramObj: PluginResponse,
    respObject: DevicePluginResponseType | object
  ) => {
    if (paramObj.errorCode === PLUGIN_ERROR_CODES.CMM01) {
      console.log(callbacks[paramObj.callbackID], 'timeout 제거');
      clearTimeout(timeoutId);
    }
    if (paramObj.errorCode === PLUGIN_ERROR_CODES.CMM00) {
      command.success(paramObj, respObject);
    }
  };

  const wrappedFail = (paramObj: PluginResponse, respObject: DevicePluginResponseType | object) => {
    clearTimeout(timeoutId);
    command.fail(paramObj, respObject);
  };

  loggerUtil.info('callPlugin', JSON.stringify(command));
  callbacks[callbackID] = command;

  try {
    mobBridge.lg.exec(
      wrappedSuccess,
      wrappedFail,
      command.callbackID,
      command.service,
      command.action,
      command.params
    );
  } catch (e) {
    // 에러 처리
    console.log(e);
    clearTimeout(timeoutId);
  }
};
