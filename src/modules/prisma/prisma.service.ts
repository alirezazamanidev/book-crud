import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from "@nestjs/config";


export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor() {

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set in environment variables or configuration.');
    }
    const adapter = new PrismaPg({ connectionString: databaseUrl });
    super({ adapter});
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
