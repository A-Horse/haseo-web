// @flow

declare type ActionType = 'REQUEST' | 'SUCCESS' | 'FAILURE' | 'FINISH';
declare interface FSAction {
  type: string;
  payload: any;
  meta?: any;
  error?: boolean;
}
