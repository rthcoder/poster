import { Module } from '@nestjs/common'
import { BranchesService } from './branches.service'
import { BranchesController } from './branches.controller'
import { PrismaModule } from '@prisma'

@Module({
  controllers: [BranchesController],
  providers: [BranchesService],
  imports: [PrismaModule],
})
export class BranchesModule {}
