import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getRooms(): Room[] {
    return this.roomsService.getAllRooms();
  }
}
