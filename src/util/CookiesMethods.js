
import { COOKIE_TIME, STORAGE_USER } from 'config/ConstantsConfig';

export function getCookie(cname) {
  // const name = `${cname}=`;
  // const decodedCookie = decodeURIComponent(document.cookie);
  // const ca = decodedCookie.split(';');
  // for (let i = 0; i < ca.length; i++) {
  //   let c = ca[i];
  //   while (c.charAt(0) === ' ') {
  //     c = c.substring(1);
  //   }
  //   if (c.indexOf(name) === 0) {
  //     return c.substring(name.length, c.length);
  //   }
  // }
  return undefined;
}

export function setCookie(cname, cvalue, exdays = COOKIE_TIME) {
  const d = new Date();
  // eslint-disable-next-line no-mixed-operators
  d.setTime(d.getTime() + exdays * 60000 * 60 * 24);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export const clearCookies = (cookies) => {
  console.log(cookies);
  cookies.remove(STORAGE_USER, {
    path: '/',
    secure: true,
  });
};
