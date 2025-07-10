import { Module } from '@nestjs/common';
import { DemoController } from '@/demo/demo.controller';

@Module({
  controllers: [DemoController],
})
export class DemoModule {} 