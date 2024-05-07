import { getHref, throttle } from '@/helper';
import { usePostDetail } from '@/store';
import { Button } from './button';

export function LikePost() {
  const like = usePostDetail((state) => state.like);
  const handleClick = () => like(getHref());
  const TEN_SECONDS = 1000 * 10;
  const throttledClick = throttle(handleClick, TEN_SECONDS);
  return <Button title="点个赞" onClick={throttledClick} render={() => <span>❤️</span>} />;
}
