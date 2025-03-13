import { Module } from '@nestjs/common'
import { RegionsService } from './regions.service'
import { RegionsController } from './regions.controller'
import { PrismaModule } from '@prisma'

@Module({
  controllers: [RegionsController],
  providers: [RegionsService],
  imports: [PrismaModule],
})
export class RegionsModule {}
