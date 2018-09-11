import aws from 'aws-sdk';
import { IEvent } from '@engineforce/aws-lambda-helpers';

export function loadCallApi(options: ILoadCallApiOptions): ICallApi {
  return callApi.bind(undefined, options);
}

async function callApi(
  options: ILoadCallApiOptions,
  apiName: string,
  input: IEvent,
  background?: boolean
): Promise<any> {
  let data = await options.lambda
    .invoke({
      FunctionName: apiName,
      Payload: JSON.stringify(input),
      InvocationType: background ? 'Event' : 'RequestResponse',
    })
    .promise();

  if (data.FunctionError) {
    throw new Error(<string>data.Payload);
  }

  try {
    if (typeof data.Payload === 'string' && data.Payload) {
      return JSON.parse(data.Payload);
    }
  } catch (ex) {
    console.error('Error parsing payload: ' + data.Payload, ex);
  }

  return data.Payload;
}

export interface ICallApi {
  (apiName: string, input: IEvent, background?: boolean): Promise<any>;
}

export interface ILoadCallApiOptions {
  lambda: aws.Lambda;
}
