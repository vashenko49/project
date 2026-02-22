export interface IBaseEntity<D = string> {
  id: string;

  createdAt: D;
  updatedAt: D;
}
