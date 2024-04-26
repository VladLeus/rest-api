import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(
    @Body()
    userData: {
      firstName: string;
      lastName: string;
      age: number;
      email: string;
      phone: string;
    },
  ) {
    if (!userData || Object.keys(userData).length === 0) {
      throw new HttpException("Request can't be empty", HttpStatus.BAD_REQUEST);
    }
    return this.usersService.register(userData);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/bookings')
  getUserBookings(@Param('id') id: string) {
    return this.usersService.getUserBookings(id);
  }
}
