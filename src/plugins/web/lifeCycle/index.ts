import { useEffect } from 'react';
import { attempt, isEmpty, isError } from 'lodash-es';
import * as PluginTypes from './types';
import { LIFE_CYCLE_CODE, ROOT_CHECK_CODE } from '@/constants/lifeCycleCode';
import { LifeCycleCheckParam, SecurityCheckParam } from './types';
declare global {
  interface Window {
    /** native plugins */
    lifeCycleCheck: PluginTypes.PluginLifeCycleCheck;
    securityCheck: PluginTypes.PluginSecurityCheck;
    backButtonHandler: PluginTypes.PluginBackButtonHandler;
  }
}

const LifeCycle = {
  pause: () => {
    console.log('pause');
    //세션 저장
    // plugin.getAccessToken(
    //   () => { },
    //   () => { }
    // );
  },
  resume: () => {
    console.log('resume');
    //세션 체크
  },
  online: () => {
    console.log('online');
  },
  offline: () => {
    console.log('offline');
  },
  backbutton: () => {
    //뒤로가기 스택에 있는 함수가 있으면 실행 없으면 history 객체를 활용한 뒤로가기 실행
    console.log('backbutton');
  },
  resign: () => {
    console.log('resign');
  },
};

const Security = {
  root: () => {},
  tamper: () => {},
  debug: () => {},
};

// 새로운 함수들 추가
const LifeCycleCheck = (params: string): void => {
  // params가 JSON 형식이 아니면 무시
  const parsedParams = attempt(JSON.parse, params);
  if (isError(parsedParams) || isEmpty(parsedParams)) {
    console.error('Invalid JSON at lifeCycleCheck:', params);
    return;
  }
  const { code, message } = parsedParams as LifeCycleCheckParam;
  switch (code) {
    case LIFE_CYCLE_CODE.RESUMED:
      LifeCycle.resume();
      break;
    case LIFE_CYCLE_CODE.PAUSED:
      LifeCycle.pause();
      break;
    default:
      console.log('알 수 없는 라이프사이클 코드:', code);
      console.log('알 수 없는 라이프사이클 메시지:', message);
      break;
  }
};

const SecurityCheck = (params: string): void => {
  // params가 JSON 형식이 아니면 무시
  const parsedParams = attempt(JSON.parse, params);
  if (isError(parsedParams) || isEmpty(parsedParams)) {
    console.error('Invalid JSON at securityCheck:', params);
    return;
  }
  const { code, message } = parsedParams as SecurityCheckParam;

  switch (code) {
    case ROOT_CHECK_CODE.ROOTED:
      Security.root();
      break;
    case ROOT_CHECK_CODE.TAMPERED:
      Security.tamper();
      break;
    case ROOT_CHECK_CODE.DEBUG_MODE:
      Security.debug();
      break;
    default:
      console.log('알 수 없는 보안 코드:', code);
      console.log('알 수 없는 보안 코드 메시지:', message);
      break;
  }
};

const BackButtonHandler = (): void => {
  LifeCycle.backbutton();
};

const LifeCycleProvider = ({ children }: React.PropsWithChildren) => {
  // const { onInitApp } = useInitApp();
  // plugin.openSettingApp(
  //   () => {},
  //   () => {}
  // );

  //테마, 폰트, 로케일 설정
  // useSyncDeviceConfig();

  useEffect(() => {
    //앱 최초 실행시 로직
    // onInitApp();
    console.log('insert lifeCycle');
    window.lifeCycleCheck = LifeCycleCheck;
    window.securityCheck = SecurityCheck;
    window.backButtonHandler = BackButtonHandler;
  }, []);

  return children;
};

export default LifeCycleProvider;
