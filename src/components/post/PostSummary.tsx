import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { usePostDetail } from '@/store/postDetail';
import dayjs from 'dayjs';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { getPost } from '../common/Visitors';

type Props = {
  date: Date;
  tags: string[];
  tldr: string;
};

export function PostSummary({ date, tags, tldr }: Props) {
  const { summary, fetch: fetcher, loading } = usePostDetail();

  const handleFetch = () => fetcher(getPost());

  return (
    <div className="space-y-4 my-4 print:hidden">
      <div className="flex gap-4 items-center text-sm dark:text-white/50 *:flex *:gap-1 *:items-center font-mono">
        <div>
          <span className="text-lg icon-[tabler--calendar]" />
          <span>{dayjs(date).format('MMMM DD,YYYY')}</span>
        </div>
        <Liked />
        <div className="font-sans">
          <span className="text-lg icon-[tabler--tags]" />
          <span>{tags.join('、')}</span>
        </div>
      </div>
      <Alert>
        <AlertTitle>
          <span className="inline-flex items-center gap-1">
            <span className="icon-[tabler--brand-openai] cursor-pointer" onClick={handleFetch}></span>
            <span className="font-bold">AI 摘要</span>
          </span>
        </AlertTitle>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        ) : (
          <AlertDescription>{summary ? summary : '滴滴嘟嘟…AI失联了'}</AlertDescription>
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
