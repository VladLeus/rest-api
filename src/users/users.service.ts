import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
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

  getUserById(id: string): User | null {
    const currUser: User = this.users.find((user: User) => user.id === id);

    if (currUser.bookingsId) {
      currUser.bookingsId = currUser.bookingsId.slice(0, 3);
    }

    return currUser;
  }

  getUserBookings(id: string): string[] | null {
    const currUser: User = this.users.find((user: User) => user.id === id);
    return currUser.bookingsId;
  }
}
