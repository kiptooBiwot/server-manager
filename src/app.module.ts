import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { RemoteServersModule } from './remote-servers/remote-servers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'r00t@admin',
      database: 'server-log-manager',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    RemoteServersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
