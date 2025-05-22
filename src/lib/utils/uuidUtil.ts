export enum IDFormat {
  NATIVE_REQUEST_ID = 'NATIVE_REQUEST_ID',
  GENERAL = 'GENERAL',
}

/**
 * UUID를 생성하는 유틸리티 함수
 * @param prefix - UUID 앞에 붙일 접두사
 * @param format - UUID 포맷 (NATIVE_REQUEST_ID 또는 GENERAL)
 * @returns 생성된 UUID 문자열
 */
export function makeUUID(prefix: string = '', format: IDFormat = IDFormat.GENERAL): string {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000000);

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (timestamp + Math.random() * 16) % 16 | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  switch (format) {
    case IDFormat.NATIVE_REQUEST_ID:
      // 네이티브 요청을 위한 간단한 형식
      return `${prefix}_${timestamp}_${randomNum}`;

    case IDFormat.GENERAL:
      // 표준 UUID v4 형식
      return prefix ? `${prefix}_${uuid}` : uuid;

    default:
      throw new Error('지원하지 않는 UUID 포맷입니다.');
  }
}

/**
 * UUID가 유효한지 검증하는 함수
 * @param uuid - 검증할 UUID 문자열
 * @returns 유효성 여부 (boolean)
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * UUID에서 prefix를 추출하는 함수
 * @param uuid - prefix가 포함된 UUID 문자열
 * @returns prefix 문자열 (없으면 빈 문자열)
 */
export function extractPrefix(uuid: string): string {
  const parts = uuid.split('_');
  return parts.length > 1 ? parts[0] : '';
}

// 사용 예시:
/*
import { makeUUID, IDFormat, isValidUUID } from '@/util/uuidUtil';

// 네이티브 요청용 ID 생성
const requestId = makeUUID('API_CALL', IDFormat.NATIVE_REQUEST_ID);
// 결과: "API_CALL_1678234567890_123456"

// 일반 UUID 생성
const generalId = makeUUID('USER', IDFormat.GENERAL);
// 결과: "USER_550e8400-e29b-41d4-a716-446655440000"

// UUID 검증
const isValid = isValidUUID(generalId);
*/
