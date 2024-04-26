import { Injectable } from '@nestjs/common';
import { Room } from './rooms.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomsService {
  rooms: Room[] = [
    new Room(
      uuidv4(),
      1,
      { adults: 2, children: 0 },
      'USD',
      50,
      'Cozy cabin retreat with fireplace.',
      false,
    ),
    new Room(
      uuidv4(),
      2,
      { adults: 2, children: 0 },
      'USD',
      50,
      'Sunny beachfront paradise.',
      false,
    ),
    new Room(
      uuidv4(),
      3,
      { adults: 2, children: 0 },
      'USD',
      50,
      'Charming countryside cottage.',
      false,
    ),
    new Room(
      uuidv4(),
      4,
      { adults: 2, children: 2 },
      'USD',
      70,
      'Magical treehouse for the family.',
      false,
    ),
    new Room(
      uuidv4(),
      5,
      { adults: 2, children: 2 },
      'USD',
      70,
      'Whimsical castle tower suite.',
      false,
    ),
    new Room(
      uuidv4(),
      6,
      { adults: 2, children: 0 },
      'USD',
      80,
      'Modern city loft with skyline view.',
      false,
    ),
    new Room(
      uuidv4(),
      7,
      { adults: 2, children: 0 },
      'USD',
      80,
      'Rustic mountain lodge hideaway.',
      false,
    ),
    new Room(
      uuidv4(),
      8,
      { adults: 2, children: 2 },
      'USD',
      100,
      'Enchanted forest glen for the family.',
      false,
    ),
    new Room(
      uuidv4(),
      9,
      { adults: 2, children: 2 },
      'USD',
      100,
      'Mystical underwater palace suite.',
      false,
    ),
    new Room(
      uuidv4(),
      10,
      { adults: 2, children: 0 },
      'USD',
      150,
      'Luxurious penthouse in the sky.',
      false,
    ),
  ];

  getAllRooms(): Room[] {
    return this.rooms.filter((room: Room) => !room.booked);
  }
}
