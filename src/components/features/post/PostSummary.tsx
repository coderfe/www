import { summary } from '@/services';
import { useEffect } from 'react';

export default function PostSummary({ slug, content }) {
  useEffect(() => {
    summary({ slug, content });
  }, []);

  return <></>;
}
