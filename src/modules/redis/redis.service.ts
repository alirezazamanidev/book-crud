import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis, { Redis as RedisClient, RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    public readonly client: RedisClient;
    private readonly logger = new Logger(RedisService.name);
    constructor() {
        // Optionally, configure Redis connection options here
        this.client = new Redis({
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            db: Number(process.env.REDIS_DB) || 0
        } as RedisOptions);
    }

    async onModuleInit() {
        this.client.on('connect', () => {
            // You can log or handle connection as needed
            this.logger.log('Redis connected');
        });
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}
