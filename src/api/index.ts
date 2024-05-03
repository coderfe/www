import ky from 'ky';

type Res<T = any> = {
  success: boolean;
  data: T;
};

const http = ky.create({
  prefixUrl: import.meta.env.DEV ? 'http://localhost:8787' : import.meta.env.PUBLIC_BASE_API_URL,
  credentials: 'include',
});

export async function aiSummary(url: string, title: string, content: string) {
  return await http
    .post('pages/summary', {
      json: {
        title,
        url,
        content,
      },
    })
    .json<Res>();
}

export async function pageView(url: string, title: string) {
  return await http
    .get('pages/view', {
      searchParams: {
        url,
        title,
      },
    })
    .json<Res>();
}
