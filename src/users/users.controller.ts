import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Booking, User } from './users.model';

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
  ): { newUserId: string } {
    return this.usersService.register(userData);
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
  addNewBooking(
    @Body()
    bookingData: {
      roomId: string;
      bookingDate: { checkIn: Date; checkOut: Date };
      userId: string;
    },
  ): { newBookingId: string } {
    return this.usersService.addNewBooking(bookingData);
  }

  @Put(':id/cancel/:roomId')
  cancelBooking(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
  ): { isBookingCanceled: boolean } {
    return this.usersService.cancelBookings(id, roomId);
  }
}
