## Setup

1. `docker-compose up -d`
2. `pnpm install`
3. Put `accounts.csv`, `posts.csv`, `sources_for_followers.csv` in `./data/` folder.
4. `pnpm run migration:run`
5. `pnpm run start:dev`
