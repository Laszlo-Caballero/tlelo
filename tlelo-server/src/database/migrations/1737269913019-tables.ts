import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1737269913019 implements MigrationInterface {
    name = 'Tables1737269913019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_9bf8a2dd1913194050fafea5f5\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`image_users\` ADD CONSTRAINT \`FK_9bf8a2dd1913194050fafea5f54\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_users\` DROP FOREIGN KEY \`FK_9bf8a2dd1913194050fafea5f54\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_9bf8a2dd1913194050fafea5f5\` ON \`image_users\``);
        await queryRunner.query(`DROP TABLE \`image_users\``);
    }

}
