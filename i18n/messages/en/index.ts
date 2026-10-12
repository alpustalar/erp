import common from './common.json';
import navigation from './navigation.json';
import auth from './auth.json';

export const enMessages = {
  ...common,
  ...navigation,
  ...auth,
} as const;
