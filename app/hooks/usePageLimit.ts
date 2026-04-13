import { useSyncExternalStore } from 'react';

const subscribeToResize = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};   
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const getLimitSnapshot = () => {
  const width = window.innerWidth;
  if (width >= 1440) return 10;
  if (width >= 768) return 8;
  return 2;
};

const getServerLimitSnapshot = () => 2; 

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerClientSnapshot = () => false;

export function usePageLimit() {
  const limit = useSyncExternalStore(subscribeToResize, getLimitSnapshot, getServerLimitSnapshot);
  const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerClientSnapshot);

  return { limit, isClient };
}