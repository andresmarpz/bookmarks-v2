export type Bookmark = {
    label: string;
    href: string;
    id: string;
};

export type Collection = {
    id: number;
    label: string;
    bookmarks: Bookmark[];
};
