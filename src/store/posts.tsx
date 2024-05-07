import { http, type ApiResponse } from '@/api';
import { create } from 'zustand';

async function fetchPostsMap<T>() {
  return await http.get('web/stat').json<ApiResponse<T>>();
}

export const usePostsMap = create<Post>((set, get) => ({
  postsMap: null,
  loading: false,
  fetchPostsMap: async () => {
    try {
      set({ loading: true });
      const { data, success } = await fetchPostsMap<PostMap>();
      if (success) {
        set({ postsMap: data });
      }
    } finally {
      set({ loading: false });
    }
  },
}));

type Stat = {
  likeCount: number;
  viewCount: number;
};

type PostMap = Record<string, Stat>;

type Post = {
  postsMap: PostMap | null;
  loading: boolean;
  fetchPostsMap: () => Promise<void>;
};
