import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1737551883995 implements MigrationInterface {
    name = 'Tables1737551883995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tableros\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_table\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tableroId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_table\` ADD CONSTRAINT \`FK_162b14be34ecd9ff152781e0afd\` FOREIGN KEY (\`tableroId\`) REFERENCES \`tableros\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_table\` ADD CONSTRAINT \`FK_19d4cfd316c838a502c6bc08090\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_table\` DROP FOREIGN KEY \`FK_19d4cfd316c838a502c6bc08090\``);
        await queryRunner.query(`ALTER TABLE \`user_table\` DROP FOREIGN KEY \`FK_162b14be34ecd9ff152781e0afd\``);
        await queryRunner.query(`DROP TABLE \`user_table\``);
        await queryRunner.query(`DROP TABLE \`tableros\``);
    }

}
