import type { Post } from '@/store/postDetail';
import ky from 'ky';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data: T;
};

export const http = ky.create({
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
    .json<ApiResponse<PostView>>();
}

export const cookie = () => http.get('web').text();

export async function likePost(url: string) {
  return await http.get('web/like', { searchParams: { url } }).text();
}
