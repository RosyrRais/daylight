import type { ApplicationConfig } from '@gulux/gulux';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  name: 'daylight',
  psm: 'edenx.http.daylight',
  applicationHttp: {},
  typegoose: {
    clients: {
      daylightDB: {
        uri: 'mongodb://localhost:27017/daylightDB',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
  session: {
    // 用于保存session信息的cookie key
    key: 'http_daylight_sid',
    // session过期时间 (ms)
    maxAge: 86400000,
    // others
  },
} as ApplicationConfig;
