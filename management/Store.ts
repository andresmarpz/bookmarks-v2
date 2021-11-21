import create from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { Bookmark, Collection } from '../types';

interface StateType {
    session?: Session | null;
    setSession: (session: Session | null) => void;

    user?: User | null;
    setUser: (user?: User | null) => void;

    username?: string | null;
    setUsername: (username?: string | null) => void;

    collections: Collection[];
    setCollections: (collections: Collection[]) => void;

    removeBookmark: (fromCollection: Collection, bookmark: Bookmark) => void;
    addBookmark: (toCollection: Collection, bookmark: Bookmark) => void;
}

export const useStore = create<StateType>((set, get) => ({
    session: null,
    setSession: (session: Session | null) => set({ session: session }),

    user: null,
    setUser: (user?: User | null) => set({ user: user }),

    username: null,
    setUsername: (username?: string | null) => set({ username: username }),

    collections: [],
    setCollections: (collections: Collection[]) =>
        set({ collections: collections }),

    removeBookmark: (fromCollection: Collection, bookmark: Bookmark) =>
        set((state) => ({
            collections: state.collections.map((c, i) =>
                c.id === fromCollection.id
                    ? {
                          ...c,
                          bookmarks: c.bookmarks.filter(
                              (bm) => bm.id !== bookmark.id
                          )
                      }
                    : c
            )
        })),
    addBookmark: (toCollection: Collection, bookmark: Bookmark) =>
        set((state) => ({
            collections: state.collections.map((c, i) =>
                c.id === toCollection.id
                    ? { ...c, bookmarks: [...c.bookmarks, bookmark] }
                    : c
            )
        }))
}));
