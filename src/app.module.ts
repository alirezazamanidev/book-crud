import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './modules/book/book.module';

import { configurations } from './configs/env.config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
      load: configurations,
    }),
    AuthModule,
    PrismaModule,
    BookModule,
    UserModule,
  ],

})
export class AppModule { }
