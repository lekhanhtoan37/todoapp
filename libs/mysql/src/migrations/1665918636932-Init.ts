import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1665918636932 implements MigrationInterface {
    name = 'Init1665918636932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`user_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`user_id\``);
    }

}
