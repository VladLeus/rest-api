import { Controller, Get, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got all rooms',
    type: Room,
  })
  getAllRooms(): Room[] {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got room by id',
    type: Room,
  })
  getRoomById(@Param('id') id: string): Room {
    return this.roomsService.getRoomById(id);
  }
}
