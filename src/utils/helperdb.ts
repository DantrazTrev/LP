import { posts, comments, IPost, IComment } from '../../data';

export function getPost(id: number): IPost | undefined {
  return posts.find((post) => post.id === id);
}

export function getComment(id: number): IComment | undefined {
  return comments.find((comment) => comment.id === id);
}

export function getCommentsbyPost(postid: number): IComment[] {
  return comments.filter((comment) => comment.postId === postid);
}

export function getPosts(): IPost[] {
  return posts;
}
