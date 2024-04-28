import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Booking, User } from './users.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: "{ newUserId: '7b305237-d0ad-48fd-bb06-e2d3a111a6e4' }",
  })
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
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 200,
    description: 'Find a user with this id',
    type: User,
  })
  getUserById(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }

  @Get(':id/bookings')
  @ApiOperation({ summary: 'Get user`s bookings' })
  @ApiResponse({
    status: 200,
    description: 'Show users`s bookings',
    type: Booking,
  })
  getUserBookings(@Param('id') id: string): Booking[] {
    return this.usersService.getUserBookings(id);
  }

  @Post(':id/book')
  @ApiOperation({ summary: 'Create a new booking for user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully created new booking for user',
    type: "{ newBookingId: '7b305237-d0ad-48fd-bb06-e2d3a111a6e4' }",
  })
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
  @ApiOperation({ summary: 'Cancel user`s booking' })
  @ApiResponse({
    status: 200,
    description: 'Successfully cancelled user`s  booking',
    type: Booking,
  })
  cancelBooking(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
  ): { isBookingCanceled: boolean } {
    return this.usersService.cancelBookings(id, roomId);
  }
}
