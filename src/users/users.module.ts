import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RoomsModule } from '../rooms/rooms.module';
import { RoomsService } from '../rooms/rooms.service';

@Module({
  imports: [RoomsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
