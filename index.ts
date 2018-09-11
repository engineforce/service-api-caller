import aws from 'aws-sdk';
import { loadCallApi } from './src/callApi';
import { loadWrapApi } from './src/wrapApi';

const lambda = new aws.Lambda();

export const callApi = loadCallApi({ lambda });
export const wrapApi = loadWrapApi({ callApi });
