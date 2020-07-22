// import { EnumPermissions } from './ConstantsConfig';

const newRoute = (path = undefined, component, permissions = []) =>
  ({ path, component, permissions });

const regexTest = (reg, string) => {
  const regex = new RegExp(`${reg.replace(/\//, '\\/')}`);
  return regex.test(string);
};

// declaração de referência de rotas para buscar link das rotas em outros arquivos
const ROUTES = {
  DEFAULT: {
    src: () => '/',
    path: match => regexTest('/{1}$', match),
  },
  TERMS: {
    src: () => '/terms-of-use',
    path: match => regexTest('/terms-of-use$', match),
  },
  POLICY: {
    src: () => '/privacy-policy',
    path: match => regexTest('/privacy-policy$', match),
  },
  HOME: {
    src: () => '/home',
    path: match => regexTest('/home$', match),
  },
  LOGIN: {
    src: () => '/login',
    path: match => regexTest('/login$', match),
  },
  CREATE_ACCOUNT: {
    src: () => '/create-account',
    path: match => regexTest('/create-account$', match),
  },
  FORGOT_PASSWORD: {
    src: () => '/forgot-password',
    path: match => regexTest('/forgot-password$', match),
  },
  ACCOUNT_RECOVERY: {
    src: () => '/account-recovery',
    path: match => regexTest('/account-recovery$', match),
  },
  FAQ: {
    src: () => '/faq',
    path: match => regexTest('/faq$', match),
  },
  SEARCH: {
    src: (search = ':search') => `/program/search/${search}`,
    path: match => regexTest('/program/search$', match),
  },
  PROGRAM_EPISODES: {
    src: (fontId = ':fontId', url = ':url') => `/program/episodes/${fontId}/${url}`,
    path: match => regexTest('/program/episodes$', match),
  },
  PROGRAM_VIDEOS: {
    src: (fontId = ':fontId', url = ':url') => `/program/episodes/videos/${fontId}/${url}`,
    path: match => regexTest('/program/episodes/videos$', match),
  },

  // MODELOS: '/modelos',
  // GERENCIAR_MODELOS_SALVAR: id =>
  // `/gerenciar/modelos/salvar/${(!!id || id === 0) ? id : ':id?'}`,
};

// declaração de rotas para roteamento da aplicação
const RoutesConfig = [
  // newRoute(ROUTES.Admin(), import('pages/Admin/AdminPage'), EnumPermissions.ADMIN),

  newRoute(ROUTES.DEFAULT.src(), import('pages/Apresentation/ApresentationPage')),
  newRoute(ROUTES.HOME.src(), import('pages/Home/HomePage')),
  newRoute(ROUTES.LOGIN.src(), import('pages/Account/LoginPage')),
  newRoute(ROUTES.CREATE_ACCOUNT.src(), import('pages/Account/CreateAccountPage')),
  newRoute(ROUTES.FORGOT_PASSWORD.src(), import('pages/Account/ForgotPasswordPage')),
  newRoute(ROUTES.ACCOUNT_RECOVERY.src(), import('pages/Account/AccountRecoveryPage')),
  newRoute(ROUTES.PROGRAM_EPISODES.src(), import('pages/Program/ProgramEpisodesPage')),
  newRoute(ROUTES.PROGRAM_VIDEOS.src(), import('pages/Program/ProgramVideoPage')),
  newRoute(ROUTES.SEARCH.src(), import('pages/Program/ProgramSearchPage')),
];
// manter rota NotFound em ultimo lugar
RoutesConfig.push(newRoute(undefined, import('pages/NotFound/NotFoundPage')));

export { RoutesConfig, ROUTES };
