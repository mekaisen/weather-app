import type { FlatMockServerConfig } from 'mock-config-server';

// let cities = [
//   'tomsk-tomsk-russia',
//   'novosibirsk-novosibirsk-russia',
//   'new-york-new-york-united-states-of-america',
//   'paris-ile-de-france-france',
//   'australind-western-australia-australia',
//   'toronto-ontario-canada',
//   'tomsk-tomsk-russia',
//   'novosibirsk-novosibirsk-russia',
//   'new-york-new-york-united-states-of-america',
//   'paris-ile-de-france-france',
//   'australind-western-australia-australia',
//   'toronto-ontario-canada'
// ];

const flatMockServerConfig: FlatMockServerConfig = [
  {
    baseUrl: '/api'
  },
  {
    configs: [
      {
        path: '/login',
        method: 'post',
        routes: [
          {
            data: { success: false, error: 'Invalid credentials' }
          },
          {
            data: { success: true, token: 'weather-app' },
            entities: {
              body: {
                email: 'sanya@mail.ru',
                password: '1234'
              }
            }
          },
          {
            entities: {
              body: {
                email: 'sanya@mail.ru',
                password: {
                  checkMode: 'exists'
                }
              }
            },
            data: { success: false, error: 'Invalid password' }
          }
        ]
      }

    ]
  }
];
export default flatMockServerConfig;
