import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostAndAccountAndFollowerSourceEntities1771781742669 implements MigrationInterface {
  name = 'AddPostAndAccountAndFollowerSourceEntities1771781742669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying NOT NULL DEFAULT uuid_generate_v4(), "created_time" TIMESTAMP NOT NULL, "profile_id" character varying NOT NULL, "text_original" text NOT NULL, "comments_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_post_crd_time" ON "posts" ("created_time") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_post_prf_id_crd_time" ON "posts" ("profile_id", "created_time") `,
    );
    await queryRunner.query(
      `CREATE TABLE "follower_sources" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying NOT NULL DEFAULT uuid_generate_v4(), "_id" integer NOT NULL, "followers_count" integer NOT NULL, CONSTRAINT "UQ_4804f1a6caca64ae20a4cd5ce54" UNIQUE ("_id"), CONSTRAINT "PK_55ec8c924484165f0d9d922c91e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX__id" ON "follower_sources" ("_id") `);
    await queryRunner.query(
      `CREATE TABLE "accounts" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "full_name" character varying NOT NULL, "description" text, "is_verified" boolean, "restricted" character varying, "_id" integer NOT NULL, "_status" character varying, "id_alt" character varying, CONSTRAINT "UQ_8abc66eb942ae325f2bd9a277fb" UNIQUE ("_id"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_account_restricted" ON "accounts" ("restricted") `);
    await queryRunner.query(
      `CREATE INDEX "idx_account_is_verified" ON "accounts" ("is_verified") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_account__id" ON "accounts" ("_id") `);
    await queryRunner.query(
      `ALTER TABLE "follower_sources" ADD CONSTRAINT "FK_4804f1a6caca64ae20a4cd5ce54" FOREIGN KEY ("_id") REFERENCES "accounts"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "follower_sources" DROP CONSTRAINT "FK_4804f1a6caca64ae20a4cd5ce54"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_account__id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_account_is_verified"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_account_restricted"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP INDEX "public"."IDX__id"`);
    await queryRunner.query(`DROP TABLE "follower_sources"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_prf_id_crd_time"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_crd_time"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
