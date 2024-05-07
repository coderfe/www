import type { Post } from '@/store';
import ky from 'ky';

type Res<T = any> = {
  success: boolean;
  data: T;
};

const http = ky.create({
  prefixUrl: import.meta.env.DEV ? 'http://localhost:8787' : import.meta.env.PUBLIC_BASE_API_URL,
  credentials: 'include',
});

type PostView = {
  summary: string;
  viewCount: number;
  likeCount: number;
};
export async function viewPost(post: Post) {
  return await http
    .post('web/view', {
      json: post,
    })
    .json<Res<PostView>>();
}

export const cookie = () => http.get('web').text();

export async function likePost(url: string) {
  return await http.get('web/like', { searchParams: { url } }).text();
}
