import common from './common.json';
import navigation from './navigation.json';
import auth from './auth.json';

export const trMessages = {
  ...common,
  ...navigation,
  ...auth,
} as const;
