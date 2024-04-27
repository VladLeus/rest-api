import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Booking, User } from './users.model';

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
  getUserById(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }

  @Get(':id/bookings')
  getUserBookings(@Param('id') id: string): Booking[] {
    return this.usersService.getUserBookings(id);
  }

  @Post('new')
  @Header('Content-Type', 'application/json')
  addNewBooking(
    @Body()
    bookingData: {
      roomId: string;
      bookingDate: { checkIn: Date; checkOut: Date };
      userId: string;
    },
  ): { newBookingId: string } {
    return {
      newBookingId: this.usersService.addNewBooking(bookingData),
    };
  }
}
