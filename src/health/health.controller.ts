import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    checkHealth() {
        return { status: 'Service is up and running!' };
    }
}
