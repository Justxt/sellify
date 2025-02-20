import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { sAdminModule } from './modules/super/sAdmin.module';
import { FranchiseModule } from './modules/franchise/franchise.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    sAdminModule,
    FranchiseModule,
  ],
  controllers: [],
})
export class AppModule {}