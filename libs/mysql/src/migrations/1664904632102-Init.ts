import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1664904632102 implements MigrationInterface {
    name = 'Init1664904632102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NULL, \`status\` int NOT NULL, \`trigger_time\` bigint NULL COMMENT 'UTC time ticks', \`create_time\` bigint NOT NULL COMMENT 'UTC time ticks', \`update_time\` bigint NOT NULL COMMENT 'UTC time ticks', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`create_time\` bigint NOT NULL COMMENT 'UTC time ticks', \`update_time\` bigint NOT NULL COMMENT 'UTC time ticks', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
