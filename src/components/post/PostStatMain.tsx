import { usePostsMap } from '@/store/posts';
import { useEffect } from 'react';

export function PostStatMain() {
  const { fetchPostsMap } = usePostsMap();

  useEffect(() => {
    fetchPostsMap();
  }, []);

  return null;
}
