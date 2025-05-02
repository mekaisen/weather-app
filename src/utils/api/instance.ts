import fetches from '@siberiacancode/fetches';

export const api = fetches.create({
  baseURL: 'http://api.weatherapi.com/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});
