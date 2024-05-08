import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { usePostDetail } from '@/store/postDetail';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

type Props = {
  date: Date;
  tags: string[];
};

export function PostSummary({ date, tags }: Props) {
  const { summary, loading } = usePostDetail();

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center text-sm dark:text-white/50 *:flex *:gap-1 *:items-center">
        <div>
          <span className="text-lg icon-[tabler--calendar]" />
          <span>{date?.toLocaleDateString()}</span>
        </div>
        <Liked />
        <div>
          <span className="text-lg icon-[tabler--tags]" />
          <span>{tags.join('、')}</span>
        </div>
      </div>
      <Alert>
        <AlertTitle>AI 摘要</AlertTitle>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        ) : (
          <AlertDescription>{summary}</AlertDescription>
        )}
      </Alert>
    </div>
  );
}

export function Liked() {
  const { likeCount } = usePostDetail();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, likeCount);
    return () => controls.stop();
  });

  return (
    <div>
      <span className="text-lg icon-[tabler--hearts]"></span>
      <motion.span>{rounded}</motion.span>
    </div>
  );
}
