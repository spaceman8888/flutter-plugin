export const LIFE_CYCLE_CODE = {
  RESUMED: 'LC01',
  PAUSED: 'LC02',
};

export const ROOT_CHECK_CODE = {
  ROOTED: 'RT01',
  TAMPERED: 'RT02',
  DEBUG_MODE: 'RT03',
};

// 라이프 사이클 코드 타입
export type LifeCycleCode = (typeof LIFE_CYCLE_CODE)[keyof typeof LIFE_CYCLE_CODE];
// 루팅 체크 코드 타입
export type RootCheckCode = (typeof ROOT_CHECK_CODE)[keyof typeof ROOT_CHECK_CODE];

export const LIFE_CYCLE_MESSAGE = {
  [LIFE_CYCLE_CODE.RESUMED]: 'resumed',
  [LIFE_CYCLE_CODE.PAUSED]: 'paused',
};

export const ROOT_CHECK_MESSAGE = {
  [ROOT_CHECK_CODE.ROOTED]: 'rooted',
  [ROOT_CHECK_CODE.TAMPERED]: 'tampered',
  [ROOT_CHECK_CODE.DEBUG_MODE]: 'debug_mode',
};
