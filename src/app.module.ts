import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './modules/book/book.module';

import { configurations } from './configs/env.config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
      load: configurations,
    }),
    PrismaModule,
    BookModule,
  ],

})
export class AppModule { }
