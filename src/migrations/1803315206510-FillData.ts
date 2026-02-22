import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface AccountRecord {
  id: string;
  username: string;
  full_name: string;
  description: string;
  is_verified: string;
  restricted: string;
  _id: string;
  _status: string;
  id_alt: string;
}

interface PostRecord {
  id: string;
  created_time: string;
  profile_id: string;
  text_original: string;
  comments_count: string;
}

interface FollowerRecord {
  _id: string;
  followers_count: string;
}

export class FillData1803315206510 implements MigrationInterface {
  name = 'FillData1803315206510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const dataDir = path.join(__dirname, '..', '..', 'data');

    const accountsCsv = fs.readFileSync(path.join(dataDir, 'accounts.csv'), 'utf8');
    const accountsRecords = parse(accountsCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }) as AccountRecord[];

    for (const record of accountsRecords) {
      await queryRunner.query(
        `INSERT INTO "accounts" (id, username, "full_name", description, "is_verified", restricted, _id, _status, "id_alt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          record.id,
          record.username,
          record.full_name,
          record.description,
          record.is_verified?.toLowerCase() === 'true',
          record.restricted === 'NULL' || !record.restricted ? null : record.restricted,
          parseInt(record._id, 10),
          record._status,
          record.id_alt === 'NULL' || !record.id_alt ? null : record.id_alt,
        ],
      );
    }

    const followersCsv = fs.readFileSync(path.join(dataDir, 'sources_for_followers.csv'), 'utf8');
    const followersRecords = parse(followersCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }) as FollowerRecord[];

    for (const record of followersRecords) {
      await queryRunner.query(
        `INSERT INTO "follower_sources" (_id, "followers_count") VALUES ($1, $2)`,
        [parseInt(record._id, 10), parseInt(record.followers_count, 10) || 0],
      );
    }

    const postsCsv = fs.readFileSync(path.join(dataDir, 'posts.csv'), 'utf8');
    const postsRecords = parse(postsCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }) as PostRecord[];

    for (const record of postsRecords) {
      await queryRunner.query(
        `INSERT INTO "posts" (id, "created_time", "profile_id", "text_original", "comments_count")
           VALUES ($1, $2, $3, $4, $5)`,
        [
          record.id,
          new Date(record.created_time),
          record.profile_id,
          record.text_original,
          parseInt(record.comments_count, 10) || 0,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "posts"`);
    await queryRunner.query(`DELETE FROM "follower_sources"`);
    await queryRunner.query(`DELETE FROM "accounts"`);
  }
}
