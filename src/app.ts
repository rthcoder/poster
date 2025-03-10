import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'auth/auth.module'
import { PrismaModule } from '@prisma'
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

    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class App {}
