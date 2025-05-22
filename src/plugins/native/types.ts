import { PluginErrorCode } from '@/constants/pluginErrors';
import { DevicePluginResponseType, DevicePluginRequestType } from './device/types';

declare global {
  interface Window {
    $$CloseWebviewCallback: Function | undefined;
    callbackListener: (respObject: PluginResponse) => void;
    multiWebViewDataCallbackListener: (message: unknown) => void;
    multiWebviewCloseCallbackListener: (message: unknown) => void;
    mobBridge: unknown;
    flutter_inappwebview?: {
      callHandler: (handlerName: string, message: string) => Promise<unknown>;
    };
    nativeBridge: {
      postMessage: (message: string) => void;
    };
  }
}

export type PluginService =
  | 'bioAuth'
  | 'device'
  | 'externalApp'
  | 'https'
  | 'localData'
  | 'location'
  | 'login'
  | 'mylgid'
  | 'nfc'
  | 'picture'
  | 'pinCode'
  | 'toast'
  | 'qrCode'
  | 'oss'
  | 'navigator'
  | 'notification'
  | 'bluetooth'
  | 'appManaging'
  | 'permission'
  | 'sharing'
  | 'payment'
  | 'storage'
  | 'keyboard'
  | 'multiWebview'
  | 'filePicker'
  | 'barcodeScan';

export type PluginAction =
  | 'getBioAuthType'
  | 'register'
  | 'getDeviceInfo'
  | 'openSettingApp'
  | 'openApp'
  | 'exitApp'
  | 'requestAPI'
  | 'setData'
  | 'getData'
  | 'clearData'
  | 'getCurrentLocation'
  | 'getToken'
  | 'requestLogin'
  | 'requestLogout'
  | 'login'
  | 'closeMultiWebview'
  | 'openMultiWebview'
  | 'tag'
  | 'getPicture'
  | 'register'
  | 'makeToast'
  | 'setValue'
  | 'scan'
  | 'show'
  | 'remove'
  | 'getBluetoothStatus'
  | 'setBluetoothOn'
  | 'getPairedBluetoothList'
  | 'connectBluetooth'
  | 'print'
  | 'checkPermission'
  | 'requestPermission'
  | 'sharing'
  | 'requestPayment'
  | 'checkAppIsInstalled'
  | 'downloadApp'
  | 'isBioMetricEnabled'
  | 'authenticate'
  | 'setData'
  | 'getData'
  | 'removeData'
  | 'removeDataAll'
  | 'getKeyboardStatus'
  | 'getFiles'
  | 'mobileBarcodeScan';

export interface PluginResponse {
  callbackID: string;
  errorCode: PluginErrorCode;
  errorMessage: string;
  params?: DevicePluginResponseType | string;
  timeout?: number;
}

export interface PluginRequest {
  callbackID?: string;
  service: PluginService;
  action: PluginAction;
  params: DevicePluginRequestType;
}

export interface MobBridgeCallback {
  className: string;
  command: string;
  success: (paramObj: PluginResponse, respObject: DevicePluginResponseType | {}) => void;
  fail: (paramObj: PluginResponse, respObject: DevicePluginResponseType | {}) => void;
  params: unknown;
}

export interface MobBridgeMobile {
  isMobile: () => boolean;
  android: () => boolean;
  ios: () => boolean;
  androidWebview: () => boolean;
  iosWebview: () => boolean;
  any: () => boolean;
  osType: string;
}

export interface MobBridgeLg {
  callbackID: number;
  callbacks: Record<string, MobBridgeCallback>;
  isMobile: MobBridgeMobile;
  command: (callbackID: string, service: string, action: string, params: unknown) => void;
  exec: (
    successCallback: (paramObj: PluginResponse, respObject: DevicePluginResponseType | {}) => void,
    failCallback: (paramObj: PluginResponse, respObject: DevicePluginResponseType | {}) => void,
    callbackID: string,
    service: string,
    action: string,
    params: unknown
  ) => void;
}

export interface MobBridge {
  lg: MobBridgeLg;
}
