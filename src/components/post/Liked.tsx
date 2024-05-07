import { usePostDetail } from '@/store';

export const Liked = () => {
  const { likeCount, loading } = usePostDetail();

  return (
    <span className="space-x-1">
      <span className="liked">❤️</span>
      {loading ? <span className="inline-block m-0 text-xs animate-spin">⌛️</span> : <span>{likeCount}</span>}
    </span>
  );
};
