import { Lambda } from 'aws-sdk';
import _ from 'lodash';
import { loadCallApi } from '../src/callApi';
import { IEvent } from '@engineforce/aws-lambda-helpers';

test('call a function', async () => {
  let invokeMock = jest.fn();

  let callApi = loadCallApi({
    lambda: <Lambda>(<any>{
      invoke: invokeMock,
    }),
  });

  const apiName = 'user-dev';
  const input: IEvent = { header: <any>{} };
  const payload = { output: 'output value' };
  invokeMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<Lambda.InvocationResponse>({
          Payload: JSON.stringify(payload),
        });
      },
    };
  });

  let response = await callApi(apiName, input);

  expect(invokeMock).toHaveBeenCalledTimes(1);
  expect(invokeMock.mock.calls[0][0]).toEqual({
    FunctionName: apiName,
    Payload: JSON.stringify(input),
    InvocationType: 'RequestResponse',
  });
  expect(response).toEqual(payload);
});
