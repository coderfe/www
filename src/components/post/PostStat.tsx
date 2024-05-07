import { usePostsMap } from '@/store/posts';

type Props = {
  url: string;
};

export function PostStat({ url }: Props) {
  const { postsMap } = usePostsMap();
  if (!postsMap) {
    return null;
  }
  const { likeCount, viewCount } = postsMap[url] || {
    likeCount: 0,
    viewCount: 0,
  };
  return (
    <div className="inline-flex space-x-4">
      <span className="liked">❤️ {likeCount}</span>
      <span className="viewed">👁️ {viewCount}</span>
    </div>
  );
}
