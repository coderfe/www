import { likePost, viewPost } from '@/api';
import { create } from 'zustand';

export interface PostDetail {
  summary: string;
  viewCount: number;
  likeCount: number;
  loading: boolean;
  like: (url: string) => void;
  fetch: (param: Post) => Promise<void>;
}

export interface Post {
  url: string;
  title: string;
  content: string | null;
}

export const usePostDetail = create<PostDetail>((set, get) => ({
  summary: '',
  viewCount: 0,
  likeCount: 0,
  loading: true,
  like: async (url: string) => {
    try {
      await likePost(url);
      const count = get().likeCount;
      set({ likeCount: count + 1 });
    } catch (error) {
      console.error(error);
    }
  },
  fetch: async (param: Post) => {
    try {
      set({ loading: true });
      const res = await viewPost(param);
      const { summary, viewCount, likeCount } = res.data;
      set({ summary, viewCount, likeCount });
    } finally {
      set({ loading: false });
    }
  },
}));
