/* eslint-disable no-lonely-if */
import { useReq } from '@edenx/runtime/bff';

export default async () =>
  Promise.resolve({
    hello: 'world',
  });

export const post = async () => {
  const request = useReq();
  const { header, body: payload } = request;
  if (header['sec-ch-ua']) {
    return Promise.resolve({
      hello: 'world',
      payload,
    });
  } else {
    if (header['user-agent']) {
      return {
        hello: 'world',
        userAgent: header['user-agent'],
        payload,
      };
    } else {
      return {
        hello: 'failure',
      };
    }
  }
};
