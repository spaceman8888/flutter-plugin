import { LifeCycleCode, RootCheckCode } from '@/constants/lifeCycleCode';

export type PluginLifeCycleCheck = (code: string) => void;
export type PluginSecurityCheck = (code: string) => void;
export type PluginBackButtonHandler = () => void;

export interface LifeCycleCheckParam {
  code: LifeCycleCode;
  message: string;
}
export interface SecurityCheckParam {
  code: RootCheckCode;
  message: string;
}
