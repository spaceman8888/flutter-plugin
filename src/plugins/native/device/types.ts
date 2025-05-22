/**
 * Device 관련 Plugin 명세
 * Action 명을 기준으로 Interface name 생성
 * ex) getPicture > IGetPictureRequest
 */

/**
 * 사진 촬영 | 이미지 요청 인터페이스
 * @property sourceType - 이미지 소스 타입 ('camera' | 'album')
 * @property category - 미디어 타입 ('image' | 'video' | 'media')
 * @property isMulti - 다중 선택 여부
 * @property width - 이미지 최대 너비(미할당 시 원본 너비)
 * @property height - 이미지 최대 높이(미할당 시 원본 높이)
 * @property videoLimit - 비디오 최대 길이(초) (default 600초)
 * @property imageLimit - 이미지 다중 선택 개수 제한 (default 무제한)
 */
export interface IGetPictureRequest {
  sourceType: 'camera' | 'gallery';
  category?: 'image' | 'video' | 'media';
  isMulti?: boolean;
  width?: number;
  height?: number;
  videoLimit?: number;
  imageLimit?: number;
}

/**
 * 사진 촬영/선택 결과 인터페이스
 * @property result - 선택된 이미지 정보 배열
 */
export interface IGetPictureResponse {
  result: Array<{
    data: string; // Base64 인코딩된 이미지 데이터
    path: string; // 이미지 파일 경로
    name: string; // 파일명
    size: string; // 파일 크기 (바이트 단위)
    mimeType: string; // 파일 포맷(video/*, image/*)
  }>;
}

/**
 * 디바이스 정보 요청 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IGetDeviceInfoRequest {}

/**
 * 디바이스 정보 결과 인터페이스
 */
export interface IGetDeviceInfoResponse {
  appVersion: string; // 앱 버전
  osType: string; // OS 타입 대문자(IOS/ANDROID)
  osVersion: string; // OS 버전
  deviceModel: string; // 기기 모델명
  language: string; // 기기 설정 언어
  deviceID: string; // 기기 고유 식별자
}

/**
 * 블루투스 상태 요청 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IGetBluetoothStatusRequest {}

/**
 * 블루투스 상태 결과 인터페이스
 * @property isOn - 블루투스 On 여부
 */
export interface IGetBluetoothStatusResponse {
  isOn: boolean;
}

/**
 * 블루투스 ON 요청 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface ISetBluetoothOnRequest {}

/**
 * 블루투스 ON 결과 인터페이스
 * @property  params 값 생기면 추가 필요
 */
export interface ISetBluetoothOnResponse {}

/**
 * 페어링된 블루투스 기기 목록 조회 요청 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IGetPairedBluetoothListRequest {}

/**
 * 페어링된 블루투스 기기 목록 조회 결과 인터페이스
 * @property deviceList - 페어링된 블루투스 기기 정보를 담은 배열
 * @property deviceList[].name - 블루투스 기기의 이름
 * @property deviceList[].macAddress - 블루투스 기기의 MAC 주소
 */
export interface IGetPairedBluetoothListResponse {
  deviceList: Array<{
    name: string;
    macAddress: string;
  }>;
}

/**
 * 블루투스 연결 요청 인터페이스
 * @property name - 블루투스 기기의 이름
 * @property macAddress - 블루투스 기기의 MAC 주소
 */
export interface IConnectBluetoothRequest {
  name: string;
  macAddress: string;
}

/**
 * 블루투스 연결 결과 인터페이스
 * @property isConnected: 블루투스 기기 연결 여부;
 */
export interface IConnectBluetoothResponse {
  isConnected: boolean;
}

/**
 * 블루투스 프린트 요청 인터페이스
 * @property texts - 프린트할 텍스트 목록, 배열 요소 하나당 한번의 프린터 출력 후 구분선 표시. 1줄에 최대 18자
 */
export interface IPrintRequest {
  texts: string[][];
}

/**
 * 블루투스 프린트 결과 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IPrintResponse {}

/**
 * 앱 권한 설정 페이지 이동
 * @property domain : 셋팅앱 이동 시 도메인
 */
export interface IOpenSettingAppRequest {
  domain: 'camera' | 'bluetooth';
}

/**
 * 앱 권한 설정 페이지 이동
 * @property params 값 생기면 추가 필요
 */
export interface IOpenSettingAppResponse {}

/**
 * 앱 권한 설정 페이지 이동
 * @property params 값 생기면 추가 필요
 */
export interface IExitAppRequest {}

/**
 * 앱 권한 설정 페이지 이동
 * @property params 값 생기면 추가 필요
 */
export interface IExitAppResponse {}

/**
 * 공유 요청 인터페이스
 * @property text - 공유할 텍스트 (optional)
 * @property imagePath - 공유할 이미지 파일 base64 string
 */
export interface ISharingRequest {
  text?: string;
  imagePath: string;
}

/** 공유 결과 인터페이스 */
export interface ISharingResponse {}

/**
 * 결제 요청 인터페이스
 * @property url - 스마트로 앱 연동 결제 요청에 사용될 값
 */
export interface IRequestPaymentRequest {
  url: string;
}

/**
 * 결제 결과 인터페이스
 * @property result - 스마트로 페이 앱에서 전달한 결제 응답 문자열
 */
export interface IRequestPaymentResponse {
  result: string;
}

/** 스마트로 페이 앱 설치 여부 체크 결과 인터페이스 */
export interface ICheckAppIsInstalledResponse {
  isInstalled: boolean;
}

/**
 * 스마트로 페이 앱 다운로드 이동 응답 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IDownloadAppResponse {}

/** 생체인증 사용 가능 여부 응답 인터페이스
 * @property result - 생체인증 사용 가능 여부
 */
export interface IIsBioMetricEnabledResponse {
  result: boolean;
}

/**
 * 생체인증 인증 요청 인터페이스
 * 생체 인증 요청 시 보이는 팝업의 타이틀, 서브타이틀, 취소 버튼 텍스트
 * @property title - 팝업 타이틀
 * @property subTitle - 팝업 서브타이틀
 * @property negativeButtonText - 팝업 취소 버튼 텍스트
 */
export interface IAuthenticateRequest {
  title: string;
  subTitle: string;
  negativeButtonText: string;
}

/**
 * 생체인증 인증 결과 응답 인터페이스
 * @property result - 생체인증 인증 결과
 * */
export interface IAuthenticateResponse {
  result: boolean;
}

/**
 * 데이터 저장 요청 인터페이스
 * @property location - 저장소 종류. device: 기기 저장소(공장 초기화시 소실), app: 앱 저장소(앱 삭제시 소실)
 * @property name - 저장할 데이터의 키
 * @property data - 저장할 데이터의 값
 */
export interface ISetDataRequest {
  location: 'device' | 'app';
  name: string;
  data: string;
}

/**
 * 데이터 저장 결과 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface ISetDataResponse {}

/**
 * 데이터 조회 요청 인터페이스
 * @property location - 저장소 종류. device: 기기 저장소, app: 앱 저장소
 * @property name - 조회할 데이터의 키
 */
export interface IGetDataRequest {
  location: 'device' | 'app';
  name: string;
}

/**
 * 데이터 조회 결과 인터페이스
 * @property data - 조회된 데이터. 저장된 타입에 따라 반환되는 타입이 다름
 */
export interface IGetDataResponse {
  data: boolean | number | string | string[];
}

/**
 * 데이터 삭제 요청 인터페이스
 * @property location - 저장소 종류. device: 기기 저장소, app: 앱 저장소
 * @property name - 삭제할 데이터의 키
 */
export interface IRemoveDataRequest {
  location: 'device' | 'app';
  name: string;
}

/**
 * 데이터 삭제 결과 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IRemoveDataResponse {}

/**
 * 데이터 삭제 요청 인터페이스
 * @property location - 저장소 종류. device: 기기 저장소, app: 앱 저장소
 */
export interface IRemoveDataAllRequest {
  location: 'device' | 'app';
}

/**
 * 데이터 삭제 결과 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IRemoveDataAllResponse {}

/** 키보드 상태 요청 인터페이스 */
export interface IGetKeyboardStatusRequest {}

/** 키보드 상태 결과 인터페이스 */
export interface IGetKeyboardStatusResponse {
  isActive: boolean;
  height: number;
  width: number;
}

/**
 * 멀티 웹뷰 열기 요청 인터페이스
 * @property target - 대상 웹뷰 도메인
 * */
export interface IOpenMultiWebviewRequest {
  target: 'chatter' | 'mcs';
}

/**
 * 멀티 웹뷰 열기 결과 인터페이스
 * @property params 값 생기면 추가 필요
 * */
export interface IOpenMultiWebviewResponse {}

/**
 * 멀티 웹뷰 닫기 요청 인터페이스
 * @property target - 대상 웹뷰 도메인
 * */
export interface ICloseMultiWebviewRequest {
  target: 'chatter' | 'mcs';
}

/**
 * 멀티 웹뷰 닫기 결과 인터페이스
 * @property params 값 생기면 추가 필요
 * */
export interface ICloseMultiWebviewResponse {}

/**
 * 파일 선택 요청 인터페이스
 * @property isMulti - 다중 선택 여부
 * @property extensions - 확장자 제한. 공백없이 ,로 구분
 */
export interface IGetFilesRequest {
  isMulti: boolean;
  extensions: string;
}

/**
 * 파일 선택 결과 인터페이스
 * @property result - 선택된 파일 정보 배열
 * @property result[].data - 이미지 base64 string
 * @property result[].path - 이미지 저장 경로
 * @property result[].name - 파일명
 * @property result[].size - 파일 사이즈(byte)
 */
export interface IGetFilesResponse {
  result: Array<{
    data: string;
    path: string;
    name: string;
    size: string;
  }>;
}

/**
 * 바코드 스캔 요청 인터페이스
 * @property params 값 생기면 추가 필요
 */
export interface IMobileBarcodeScanRequest {}

/**
 * 바코드 스캔 결과 인터페이스
 * @property barcodeResultList - 바코드 스캔 결과
 */
export interface IMobileBarcodeScanResponse {
  barcodeResultList: string[];
}

/**
 * 권한 관련 기본 인터페이스
 * @property type - 권한 유형 ('camera' | 'gallery' | 'bluetooth')
 */
export interface IBasePermissionRequest {
  type: 'camera' | 'gallery' | 'bluetooth';
}

/**
 * 권한 관련 결과 기본 인터페이스
 * @property type - 권한 유형 ('camera' | 'gallery' | 'bluetooth')
 * @property status - 권한 상태
 * - granted: 권한 허용됨
 * - denied: 권한 거부됨
 * - permanentlyDenied: 권한 영구 거부됨
 */
export interface IBasePermissionResponse {
  type: 'camera' | 'gallery' | 'bluetooth';
  status: 'granted' | 'denied' | 'permanentlyDenied';
}

export interface ICheckPermissionRequest extends IBasePermissionRequest {}
export interface ICheckPermissionResponse extends IBasePermissionResponse {}

export interface IRequestPermissionRequest extends IBasePermissionRequest {}
export interface IRequestPermissionResponse extends IBasePermissionResponse {}

/**
 * 디바이스 플러그인에서 사용하는 모든 요청 타입들의 통합 타입
 */
export type DevicePluginRequestType =
  | IGetPictureRequest
  | IGetDeviceInfoRequest
  | IGetBluetoothStatusRequest
  | ISetBluetoothOnRequest
  | IGetPairedBluetoothListRequest
  | IConnectBluetoothRequest
  | IOpenSettingAppRequest
  | IExitAppRequest
  | ICheckPermissionRequest
  | IRequestPermissionRequest;

/**
 * 디바이스 플러그인에서 사용하는 모든 응답 타입들의 통합 타입
 */
export type DevicePluginResponseType =
  | IGetPictureResponse
  | IGetDeviceInfoResponse
  | IGetBluetoothStatusResponse
  | ISetBluetoothOnResponse
  | IGetPairedBluetoothListResponse
  | IConnectBluetoothResponse
  | IOpenSettingAppResponse
  | IExitAppResponse
  | ICheckPermissionResponse
  | IRequestPermissionResponse;
