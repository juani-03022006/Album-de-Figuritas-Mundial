import { useEffect, useState } from 'react';
import { DEFAULT_USER_ID } from '../config/api.js';
import { fetchUserAlbum, getMockAlbumResponse } from '../services/albumService.js';

export function useAlbum(userId = DEFAULT_USER_ID) {
  const [album, setAlbum] = useState({ userId: '', selections: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAlbum() {
      setIsLoading(true);
      setError(null);
      setIsUsingMockData(false);

      try {
        const data = await fetchUserAlbum(userId);
        if (!isMounted) return;
        setAlbum(data);
      } catch (requestError) {
        if (!isMounted) return;

        if (import.meta.env.DEV) {
          setAlbum(getMockAlbumResponse());
          setIsUsingMockData(true);
          setError(null);
        } else {
          setAlbum({ userId, selections: [] });
          setError(requestError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAlbum();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return {
    selections: album.selections,
    isLoading,
    error,
    isUsingMockData,
  };
}
