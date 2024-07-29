import { useCallback, useEffect, useState } from 'react';
import { database } from './firebase';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, open, close };
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addEventListener('change', listener);
    return () => queryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function usePresence(uid) {
  const [presence, setPresence] = useState({
    state: 'unknown',
    last_changed: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setPresence({ state: 'unknown', last_changed: null });
      return;
    }

    const userStatusRef = database.ref(`/status/${uid}`);

    const handleValueChange = snap => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      } else {
        setPresence({ state: 'unknown', last_changed: null });
      }
    };

    const handleError = err => {
      console.error('Failed to fetch presence data:', err);
      setError(err.message || 'Failed to fetch presence data');
    };

    userStatusRef.on('value', handleValueChange, handleError);

    return () => {
      userStatusRef.off('value', handleValueChange);
    };
  }, [uid]);

  return { presence, error };
}
