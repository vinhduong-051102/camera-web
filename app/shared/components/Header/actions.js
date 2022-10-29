import { ACTION_SIDEBAR_CLOSE, ACTION_SIDEBAR_OPEN } from './constants';

export const openSidebar = () => ({
  type: ACTION_SIDEBAR_OPEN,
});

export const closeSidebar = () => ({
  type: ACTION_SIDEBAR_CLOSE,
});
