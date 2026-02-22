export interface IPost<D = string> {
  id: string;

  createdTime: D;

  profileId: string;

  textOriginal: string;

  commentsCount: number;
}
