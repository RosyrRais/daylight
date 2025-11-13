import type { ApplicationConfig } from '@gulux/gulux';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  name: 'app',
  psm: 'edenx.http.example',
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
} as ApplicationConfig;
