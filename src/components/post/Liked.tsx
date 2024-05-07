import { usePostDetail } from '@/store/postDetail';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function Liked() {
  const { likeCount, loading } = usePostDetail();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, likeCount);
    return () => controls.stop();
  });

  return (
    <span className="space-x-1 w-16">
      <span className="liked">❤️</span>
      {loading ? (
        <span className="inline-block m-0 text-xs animate-spin">⌛️</span>
      ) : (
        <motion.span>{rounded}</motion.span>
      )}
    </span>
  );
}
