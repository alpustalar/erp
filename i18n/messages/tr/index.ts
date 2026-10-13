import common from './common.json';
import navigation from './navigation.json';
import auth from './auth.json';
import notifications from './notifications.json';

export const trMessages = {
  ...common,
  ...navigation,
  ...auth,
  ...notifications,
} as const;
