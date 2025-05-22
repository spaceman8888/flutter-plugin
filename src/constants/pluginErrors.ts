// 에러 코드 맵
export const PLUGIN_ERROR_CODES = {
  // 공통 에러
  CMM00: 'CMM00',
  CMM01: 'CMM01',
  CMM02: 'CMM02',
  CMM03: 'CMM03',
  CMM04: 'CMM04',
  CMM05: 'CMM05',
  CMM06: 'CMM06',

  // 권한 관련 에러
  PER01: 'PER01',
  PER02: 'PER02',

  // 이미지 관련 에러
  IMG01: 'IMG01',
  IMG02: 'IMG02',
  IMG03: 'IMG03',
  IMG04: 'IMG04',
  IMG05: 'IMG05',

  // 블루투스 관련 에러
  BLU00: 'BLU00',
  BLU01: 'BLU01',
  BLU02: 'BLU02',
  BLU03: 'BLU03',
  BLU04: 'BLU04',

  // 공유 관련 에러
  SH01: 'SH01',
  SH02: 'SH02',

  // 결제 관련 에러
  PAY01: 'PAY01',
  PAY02: 'PAY02',

  // 생체 관련 에러
  BIO01: 'BIO01',
  BIO02: 'BIO02',
  BIO03: 'BIO03',
  BIO04: 'BIO04',
  BIO05: 'BIO05',
  BIO06: 'BIO06',
  BIO07: 'BIO07',
  BIO08: 'BIO08',
  BIO09: 'BIO09',

  // 저장소 관련 에러
  SSS01: 'SSS01',
  SSS02: 'SSS02',

  // 파일 관련 에러
  FIL01: 'FIL01',

  // 바코드 관련 에러
  BAC01: 'BAC01',
  BAC02: 'BAC02',
  BAC03: 'BAC03',
} as const;

// 에러 코드 타입
export type PluginErrorCode = (typeof PLUGIN_ERROR_CODES)[keyof typeof PLUGIN_ERROR_CODES];

// 에러 메시지 맵
export const PLUGIN_ERROR_MESSAGES: Record<PluginErrorCode, string> = {
  [PLUGIN_ERROR_CODES.CMM00]: '플러그인 실행에 성공했습니다.',
  [PLUGIN_ERROR_CODES.CMM01]: '서비스가 연결되었습니다.',
  [PLUGIN_ERROR_CODES.CMM02]: '사용자가 실행을 취소하였습니다.',
  [PLUGIN_ERROR_CODES.CMM03]: '잘못된 요청입니다.',
  [PLUGIN_ERROR_CODES.CMM04]: '플러그인 실행 중 타임아웃 되었습니다.',
  [PLUGIN_ERROR_CODES.CMM05]: '메모리가 부족합니다.',
  [PLUGIN_ERROR_CODES.CMM06]: '플러그인 실행에 실패하였습니다.',
  [PLUGIN_ERROR_CODES.PER01]: '카메라 접근 권한이 필요합니다.',
  [PLUGIN_ERROR_CODES.PER02]: '앨범 접근 권한이 필요합니다.',
  [PLUGIN_ERROR_CODES.IMG01]: '서비스가 이미 실행중입니다.',
  [PLUGIN_ERROR_CODES.IMG02]: '사용가능한 카메라가 없습니다.',
  [PLUGIN_ERROR_CODES.IMG03]: '백그라운드에서 실행할 수 없습니다.',
  [PLUGIN_ERROR_CODES.IMG04]: '카메라를 사용할 수 없습니다.',
  [PLUGIN_ERROR_CODES.IMG05]: '백그라운드에서 실행할 수 없습니다.',
  [PLUGIN_ERROR_CODES.BLU00]: '블루투스를 지원하지 않는 기기입니다.',
  [PLUGIN_ERROR_CODES.BLU01]: '블루투스가 꺼져있습니다.',
  [PLUGIN_ERROR_CODES.BLU02]: '블루투스 관련 권한이 필요합니다.',
  [PLUGIN_ERROR_CODES.BLU03]: '대상 블루투스 기기를 찾을 수 없습니다.',
  [PLUGIN_ERROR_CODES.BLU04]: '요청하신 플랫폼에서는 지원하지 않는 기능입니다.',
  [PLUGIN_ERROR_CODES.SH01]: '이미지 형식이 올바르지 않습니다.',
  [PLUGIN_ERROR_CODES.SH02]: '공유에 실패했습니다.',
  [PLUGIN_ERROR_CODES.PAY01]: '결제 단말의 연결을 확인해주세요.',
  [PLUGIN_ERROR_CODES.PAY02]: '스마트로 페이 앱을 설치해야 합니다.',
  [PLUGIN_ERROR_CODES.BIO01]: '생체인식 센서를 사용할 수 없습니다.',
  [PLUGIN_ERROR_CODES.BIO02]: '사용자가 다른 인증 방법을 선택했습니다.',
  [PLUGIN_ERROR_CODES.BIO03]: '시도 횟수를 초과했습니다.',
  [PLUGIN_ERROR_CODES.BIO04]: '영구적 잠금 상태가 되었습니다.',
  [PLUGIN_ERROR_CODES.BIO05]: '시간 초과 되었습니다.',
  [PLUGIN_ERROR_CODES.BIO06]: '등록된 생체인식 정보가 없습니다',
  [PLUGIN_ERROR_CODES.BIO07]: '생체인식 하드웨어가 없습니다.',
  [PLUGIN_ERROR_CODES.BIO08]: '생체인식 하드웨어 사용이 불가합니다.',
  [PLUGIN_ERROR_CODES.BIO09]: '저장 공간이 부족합니다.',
  [PLUGIN_ERROR_CODES.SSS01]: '지원하지 않는 데이터 타입입니다.',
  [PLUGIN_ERROR_CODES.SSS02]: '저장된 데이터가 없습니다.',
  [PLUGIN_ERROR_CODES.FIL01]: '선택하지 않은 파일 확장자입니다.',
  [PLUGIN_ERROR_CODES.BAC01]: '카메라 플래쉬를 토글할 수 없습니다.',
  [PLUGIN_ERROR_CODES.BAC02]: '카메라 초기화 또는 카메라 사용 불가 에러입니다.',
  [PLUGIN_ERROR_CODES.BAC03]: '카메라 권한이 필요합니다.',
};

// 에러 객체 생성 유틸리티
export function createError(code: PluginErrorCode): { code: PluginErrorCode; message: string } {
  return {
    code,
    message: PLUGIN_ERROR_MESSAGES[code],
  };
}
