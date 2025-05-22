import { callPlugin } from '@/plugins/native/common';
import {
  ICheckPermissionRequest,
  IRequestPermissionRequest,
  IGetPictureResponse,
  IGetDeviceInfoResponse,
  IGetBluetoothStatusResponse,
  ISetBluetoothOnResponse,
  IGetPairedBluetoothListResponse,
  IConnectBluetoothResponse,
  IOpenSettingAppRequest,
  IOpenSettingAppResponse,
  IExitAppResponse,
  IConnectBluetoothRequest,
  IMobileBarcodeScanResponse,
  IRequestPermissionResponse,
  ICheckPermissionResponse,
  IPrintResponse,
  IPrintRequest,
  ISetDataResponse,
  IGetDataRequest,
  IGetDataResponse,
  IRemoveDataResponse,
  IRemoveDataRequest,
  IRemoveDataAllResponse,
  IRemoveDataAllRequest,
  ISetDataRequest,
  IGetKeyboardStatusResponse,
  IGetFilesResponse,
  IGetFilesRequest,
  ISharingRequest,
  ISharingResponse,
  IGetPictureRequest,
  IRequestPaymentResponse,
  IRequestPaymentRequest,
  ICheckAppIsInstalledResponse,
  IDownloadAppResponse,
  IIsBioMetricEnabledResponse,
  IAuthenticateRequest,
  IAuthenticateResponse,
  IOpenMultiWebviewResponse,
  IOpenMultiWebviewRequest,
  ICloseMultiWebviewResponse,
  ICloseMultiWebviewRequest,
} from './types';
import { PluginResponse } from '@/plugins/native/types';

const Device = (function () {
  return {
    /** Picture */
    getPictures: (
      params: Omit<IGetPictureRequest, 'sourceType'> | null = {},
      success: (paramObj: PluginResponse, respObject: IGetPictureResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetPictureResponse | {}) => void
    ) => {
      const parameters: IGetPictureRequest = {
        ...params,
        sourceType: 'gallery',
      };
      callPlugin({
        service: 'picture',
        action: 'getPicture',
        params: parameters,
        success,
        fail,
      });
    },
    getCamera: (
      params: Omit<IGetPictureRequest, 'sourceType' | 'isMulti' | 'imageLimit'> | null = {},
      success: (paramObj: PluginResponse, respObject: IGetPictureResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetPictureResponse | {}) => void
    ) => {
      const parameters: IGetPictureRequest = {
        ...params,
        sourceType: 'camera',
        isMulti: false, // camera는 항상 하나의 이미지만 반환
      };
      callPlugin({
        service: 'picture',
        action: 'getPicture',
        params: parameters,
        success,
        fail,
      });
    },
    /** Device */
    getDeviceInfo: (
      success: (paramObj: PluginResponse, respObject: IGetDeviceInfoResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetDeviceInfoResponse | {}) => void
    ) => {
      callPlugin({
        service: 'device',
        action: 'getDeviceInfo',
        params: {},
        success,
        fail,
      });
    },
    /** Permission */
    checkPermission: (
      type: ICheckPermissionRequest['type'],
      success: (paramObj: PluginResponse, respObject: ICheckPermissionResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: ICheckPermissionResponse | {}) => void
    ) => {
      callPlugin({
        service: 'permission',
        action: 'checkPermission',
        params: {
          type,
        },
        success,
        fail,
      });
    },
    requestPermission: (
      type: IRequestPermissionRequest['type'],
      success: (paramObj: PluginResponse, respObject: IRequestPermissionResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IRequestPermissionResponse | {}) => void
    ) => {
      callPlugin({
        service: 'permission',
        action: 'requestPermission',
        params: {
          type,
        },
        success,
        fail,
      });
    },
    /** Bluetooth */
    getBluetoothStatus: (
      success: (paramObj: PluginResponse, respObject: IGetBluetoothStatusResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetBluetoothStatusResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bluetooth',
        action: 'getBluetoothStatus',
        params: {},
        success,
        fail,
      });
    },
    setBluetoothOn: (
      success: (paramObj: PluginResponse, respObject: ISetBluetoothOnResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: ISetBluetoothOnResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bluetooth',
        action: 'setBluetoothOn',
        params: {},
        success,
        fail,
      });
    },
    getPairedBluetoothList: (
      success: (paramObj: PluginResponse, respObject: IGetPairedBluetoothListResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetPairedBluetoothListResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bluetooth',
        action: 'getPairedBluetoothList',
        params: {},
        success,
        fail,
      });
    },
    connectBluetooth: (
      deviceInfo: IConnectBluetoothRequest,
      success: (paramObj: PluginResponse, respObject: IConnectBluetoothResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IConnectBluetoothResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bluetooth',
        action: 'connectBluetooth',
        params: { ...deviceInfo },
        success,
        fail,
      });
    },
    print: (
      texts: IPrintRequest['texts'],
      success: (paramObj: PluginResponse, respObject: IPrintResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IPrintResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bluetooth',
        action: 'print',
        params: {
          texts: texts,
        },
        success,
        fail,
      });
    },
    /** App Managing */
    openSettingApp: (
      domain: IOpenSettingAppRequest['domain'],
      success: (paramObj: PluginResponse, respObject: IOpenSettingAppResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IOpenSettingAppResponse | {}) => void
    ) => {
      callPlugin({
        service: 'appManaging',
        action: 'openSettingApp',
        params: {
          domain,
        },
        success,
        fail,
      });
    },
    exitApp: (
      success: (paramObj: PluginResponse, respObject: IExitAppResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IExitAppResponse | {}) => void
    ) => {
      callPlugin({
        service: 'appManaging',
        action: 'exitApp',
        params: {},
        success,
        fail,
      });
    },
    /** Sharing */
    sharing: (
      { text = '', imagePath }: ISharingRequest,
      success: (paramObj: PluginResponse, respObject: ISharingResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: ISharingResponse | {}) => void
    ) => {
      callPlugin({
        service: 'sharing',
        action: 'sharing',
        params: { text, imagePath },
        success,
        fail,
      });
    },
    /** Payment */
    requestPayment: (
      url: IRequestPaymentRequest['url'],
      success: (paramObj: PluginResponse, respObject: IRequestPaymentResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IRequestPaymentResponse | {}) => void
    ) => {
      callPlugin({
        service: 'payment',
        action: 'requestPayment',
        params: { url },
        success,
        fail,
      });
    },
    checkAppIsInstalled: (
      success: (paramObj: PluginResponse, respObject: ICheckAppIsInstalledResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: ICheckAppIsInstalledResponse | {}) => void
    ) => {
      callPlugin({
        service: 'payment',
        action: 'checkAppIsInstalled',
        params: {},
        success,
        fail,
      });
    },
    downloadApp: (
      success: (paramObj: PluginResponse, respObject: IDownloadAppResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IDownloadAppResponse | {}) => void
    ) => {
      callPlugin({
        service: 'payment',
        action: 'downloadApp',
        params: {},
        success,
        fail,
      });
    },
    /** BioAuth */
    isBioMetricEnabled: (
      success: (paramObj: PluginResponse, respObject: IIsBioMetricEnabledResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IIsBioMetricEnabledResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bioAuth',
        action: 'isBioMetricEnabled',
        params: {},
        success,
        fail,
      });
    },
    authenticate: (
      {
        title = '생체인증',
        subTitle = '생체인증으로 로그인',
        negativeButtonText = '비밀번호로 로그인',
      }: IAuthenticateRequest,
      success: (paramObj: PluginResponse, respObject: IAuthenticateResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IAuthenticateResponse | {}) => void
    ) => {
      callPlugin({
        service: 'bioAuth',
        action: 'authenticate',
        params: { title, subTitle, negativeButtonText },
        success,
        fail,
      });
    },
    /** Storage */
    setData: (
      { location, name, data }: ISetDataRequest,
      success: (paramObj: PluginResponse, respObject: ISetDataResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: ISetDataResponse | {}) => void
    ) => {
      callPlugin({
        service: 'storage',
        action: 'setData',
        params: { location, name, data },
        success,
        fail,
      });
    },
    getData: (
      { location, name }: IGetDataRequest,
      success: (paramObj: PluginResponse, respObject: IGetDataResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetDataResponse | {}) => void
    ) => {
      callPlugin({
        service: 'storage',
        action: 'getData',
        params: { location, name },
        success,
        fail,
      });
    },
    removeData: (
      { location, name }: IRemoveDataRequest,
      success: (paramObj: PluginResponse, respObject: IRemoveDataResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IRemoveDataResponse | {}) => void
    ) => {
      callPlugin({
        service: 'storage',
        action: 'removeData',
        params: { location, name },
        success,
        fail,
      });
    },
    removeDataAll: (
      { location }: IRemoveDataAllRequest,
      success: (paramObj: PluginResponse, respObject: IRemoveDataAllResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IRemoveDataAllResponse | {}) => void
    ) => {
      callPlugin({
        service: 'storage',
        action: 'removeDataAll',
        params: { location },
        success,
        fail,
      });
    },
    /** Keyboard */
    getKeyboardStatus: (
      success: (paramObj: PluginResponse, respObject: IGetKeyboardStatusResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetKeyboardStatusResponse | {}) => void
    ) => {
      callPlugin({
        service: 'keyboard',
        action: 'getKeyboardStatus',
        params: {},
        success,
        fail,
      });
    },
    /** Multi Webview */
    openMultiWebview: (
      target: IOpenMultiWebviewRequest['target'],
      success: (paramObj: PluginResponse, respObject: IOpenMultiWebviewResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IOpenMultiWebviewResponse | {}) => void
    ) => {
      callPlugin({
        service: 'multiWebview',
        action: 'openMultiWebview',
        params: { target },
        success,
        fail,
      });
    },
    closeMultiWebview: (
      target: ICloseMultiWebviewRequest['target'],
      success: (paramObj: PluginResponse, respObject: ICloseMultiWebviewResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: ICloseMultiWebviewResponse | {}) => void
    ) => {
      callPlugin({
        service: 'multiWebview',
        action: 'closeMultiWebview',
        params: { target },
        success,
        fail,
      });
    },
    /** File Picker */
    getFiles: (
      { isMulti, extensions }: IGetFilesRequest,
      success: (paramObj: PluginResponse, respObject: IGetFilesResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IGetFilesResponse | {}) => void
    ) => {
      callPlugin({
        service: 'filePicker',
        action: 'getFiles',
        params: { isMulti, extensions },
        success,
        fail,
      });
    },
    /** Barcode Scanner */
    mobileBarcodeScan: (
      success: (paramObj: PluginResponse, respObject: IMobileBarcodeScanResponse | {}) => void,
      fail: (paramObj: PluginResponse, respObject: IMobileBarcodeScanResponse | {}) => void
    ) => {
      callPlugin({
        service: 'barcodeScan',
        action: 'mobileBarcodeScan',
        params: {},
        success,
        fail,
      });
    },
  };
})();

export default Device;
