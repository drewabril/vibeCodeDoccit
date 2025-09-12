export interface User {
    id: string;
    username: string;
    email: string;
    role: 'Administrator' | 'Creator' | 'Read-Only';
}

export interface Post {
    id: string;
    title: string;
    content: string;
    subredditId: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    postId: string;
    content: string;
    authorId: string;
    createdAt: Date;
}

export interface Subreddit {
    id: string;
    name: string;
    ownerId: string;
    sidebarContent: string;
    createdAt: Date;
}

export interface Flair {
    id: string;
    name: string;
    subredditId: string;
}