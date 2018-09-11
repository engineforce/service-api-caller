import { ICallApi } from './callApi';
import { IEvent } from '@engineforce/aws-lambda-helpers';

export function loadWrapApi(options: ILoadWrapApiOptions): IWrapApi {
  return wrapApi.bind(undefined, options);
}

function wrapApi(
  options: ILoadWrapApiOptions,
  serviceName: string,
  apiName: string,
  background?: boolean
): (input: IEvent) => Promise<any> {
  return async (input) => {
    return options.callApi(`${serviceName}-${apiName}`, input, background);
  };
}

export interface IWrapApi {
  (serviceName: string, apiName: string, background?: boolean): (
    input: IEvent
  ) => Promise<any>;
}

export interface ILoadWrapApiOptions {
  callApi: ICallApi;
}
