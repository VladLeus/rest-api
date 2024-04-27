import {
  Body,
  Controller,
  Get, Header,
  HttpException,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  register(
    @Body()
    userData: {
      firstName: string;
      lastName: string;
      age: number;
      email: string;
      phone: string;
    },
  ): { newUserId: string } {
    if (!userData || Object.keys(userData).length === 0) {
      throw new HttpException("Request can't be empty", HttpStatus.BAD_REQUEST);
    }
    return { newUserId: this.usersService.register(userData) };
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
