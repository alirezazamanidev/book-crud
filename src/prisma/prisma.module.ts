import { Global, Module } from "@nestjs/common";
import { PRISMA_PROVIDER } from "../common/constants/global.constants";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
@Global()
@Module({
  imports: [],
  providers: [{

    provide:PRISMA_PROVIDER,
    inject:[ConfigService],
    useFactory:(configService:ConfigService) => {
      const databaseUrl =
      configService.get<string>('DATABASE_URL') ?? process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set in environment variables or configuration.');
    }
    const adapter = new PrismaPg({ connectionString: databaseUrl });
    return new PrismaClient({ adapter });
    }
  }],

  exports: [PRISMA_PROVIDER],

})
export class PrismaModule {}
