declare type ProcessEnvFields =
  // Base
  | 'NODE_ENV'
  | 'PORT'

  // DataBase
  | 'DB_PORT'
  | 'DB_HOST'
  | 'DB_USER'
  | 'DB_PASSWORD'
  | 'DB_NAME';

declare namespace NodeJS {
  export type ProcessEnv = Record<ProcessEnvFields, string>;
}
