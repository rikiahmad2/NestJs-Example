import { MigrationInterface, QueryRunner } from "typeorm"

export class SampleTable1657001325132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE sample(
                vehicleId INT NOT NULL,  
                make VARCHAR(64),
                model VARCHAR(128),
                derivative VARCHAR(255),
                PRIMARY KEY(vehicleId)
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
