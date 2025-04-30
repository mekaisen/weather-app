import type { FlatMockServerConfig } from 'mock-config-server';

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
