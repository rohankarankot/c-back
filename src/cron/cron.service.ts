import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    @Cron('*/10 * * * *') // Runs every 10 minute
    async handleCron() {
        this.logger.debug('Pinging own health check endpoint...');
        try {
            // Using localhost to ping itself
            await axios.get(`${process.env.BASE_URL}/health`);
            this.logger.debug('Health check ping successful!');
        } catch (error) {
            this.logger.error('Failed to ping health check endpoint', error);
        }
    }
}
