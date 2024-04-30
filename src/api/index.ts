import ky from 'ky';

type Res<T = any> = {
  success: boolean;
  data: T;
};

const http = ky.create({
  prefixUrl: import.meta.env.DEV ? 'http://localhost:8787' : import.meta.env.PUCLIC_BASE_URL,
  credentials: 'include',
});

export async function fetchSummary(url: string, content: string) {
  return await http
    .post('kimi/summary', {
      json: {
        url,
        content,
      },
    })
    .json<Res>();
}

export async function updateVisitorsByUrl(url: string, visited: boolean = false) {
  return await http
    .post('visitor', {
      json: {
        url,
        visited,
      },
    })
    .json<Res>();
}
