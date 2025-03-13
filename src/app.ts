import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@auth'
import { PrismaModule } from '@prisma'
import { UsersModule, RegionsModule } from '@modules'
// import { ServeStaticModule } from '@nestjs/serve-static'

import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    // ServeStaticModule.forRoot(
    //   {
    //     rootPath: join(__dirname, '..', 'uploads'),
    //     serveRoot: '/uploads',
    //   },
    //   {
    //     rootPath: join(__dirname, '..', 'logs'),
    //     serveRoot: '/logs',
    //   },
    // ),

    UsersModule,
    AuthModule,
    PrismaModule,
    RegionsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class App {}
