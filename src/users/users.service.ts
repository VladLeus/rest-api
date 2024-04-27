import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking, User } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import { RoomsService } from '../rooms/rooms.service';
import { Room } from '../rooms/rooms.model';

@Injectable()
export class UsersService {
  constructor(private readonly roomsService: RoomsService) {}

  users: User[] = [];

  register(userData): string {
    const newUser: User = new User(
      uuidv4(),
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      userData.phone,
      [],
    );
    this.users.push(newUser);
    return newUser.id;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user: User) => user.id === id);
  }

  addNewBooking(bookingData: {
    roomId: string;
    bookingDate: { checkIn: Date; checkOut: Date };
    userId: string;
  }): string {
    const room: Room = this.roomsService.getRoomById(bookingData.roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const newBooking: Booking = new Booking(
      uuidv4(),
      bookingData.roomId,
      bookingData.bookingDate,
    );

    const user: User = this.getUserById(bookingData.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.bookings.unshift(newBooking);

    return newBooking.id;
  }

  getUserBookings(id: string): Booking[] | null {
    const currUser: User = this.users.find((user: User) => user.id === id);
    return currUser.bookings;
  }
}
