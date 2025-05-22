export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface ICommentResponse {
    comments: IComment[];
}



