import ky from 'ky';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data: T;
};

export const http = ky.create({
  prefixUrl: import.meta.env.DEV ? 'http://localhost:8787' : import.meta.env.PUBLIC_BASE_API_URL,
  credentials: 'include',
});

export async function view(json: any) {
  return await http
    .post('blog/post/view', {
      json,
    })
    .json<ApiResponse<number>>();
}

export async function summary(json: any) {
  return await http
    .post('blog/post/summary', {
      json,
    })
    .json();
}

export async function heartbeat() {
  let uid = localStorage.getItem('uid');
  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem('uid', uid);
  }
  return await http.get(`blog/heartbeat?uid=${uid}`).json<ApiResponse>();
}
