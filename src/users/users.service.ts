import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Booking, User } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import { RoomsService } from '../rooms/rooms.service';
import { Room } from '../rooms/rooms.model';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(private readonly roomsService: RoomsService) {}

  register(userData: {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
  }): { newUserId: string } {
    if (
      typeof userData !== 'object' ||
      userData === null ||
      Array.isArray(userData)
    ) {
      throw new HttpException(
        'Invalid userData format. Expected an object.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const requiredFields: string[] = [
      'firstName',
      'lastName',
      'age',
      'email',
      'phone',
    ];
    for (const field of requiredFields) {
      if (!(field in userData)) {
        throw new HttpException(
          `Field '${field}' is required.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (
      typeof userData.firstName !== 'string' ||
      typeof userData.lastName !== 'string' ||
      typeof userData.age !== 'number' ||
      typeof userData.email !== 'string' ||
      typeof userData.phone !== 'string'
    ) {
      throw new HttpException(
        'Invalid data types for fields.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = new User(
      uuidv4(),
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      userData.phone,
      [],
    );
    this.users.unshift(newUser);

    return { newUserId: newUser.id };
  }

  getUserById(id: string): User {
    const user: User = this.users.find((user: User) => user.id === id);

    if (!user) {
      throw new NotFoundException('User with this id not found');
    }

    return user;
  }

  getUserBookings(id: string): Booking[] | null {
    const currUser: User = this.getUserById(id);

    if (currUser.bookings.length === 0) {
      throw new ForbiddenException("User doesn't have any bookings yet.");
    }

    return currUser.bookings;
  }

  addNewBooking(bookingData: {
    roomId: string;
    bookingDate: { checkIn: Date; checkOut: Date };
    userId: string;
  }): { newBookingId: string } {
    const room: Room = this.roomsService.getRoomById(bookingData.roomId);
    const user: User = this.getUserById(bookingData.userId);

    this.roomsService.bookRoom(room.id);

    const newBooking: Booking = new Booking(
      uuidv4(),
      bookingData.roomId,
      bookingData.bookingDate,
    );

    user.bookings.unshift(newBooking);

    return { newBookingId: newBooking.id };
  }

  cancelBookings(id: string, roomId: string): { isBookingCanceled: boolean } {
    const user: User = this.getUserById(id);

    if (!user.bookings.map((b: Booking) => b.roomId).includes(roomId)) {
      throw new ForbiddenException("User doesn't have such booking");
    }

    this.roomsService.unbookRoom(roomId);

    user.bookings = user.bookings.filter(
      (booking: Booking) => booking.roomId !== roomId,
    );

    return { isBookingCanceled: true };
  }
}
