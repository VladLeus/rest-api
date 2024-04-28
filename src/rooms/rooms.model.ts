import { ApiProperty } from '@nestjs/swagger';

export class Room {
  @ApiProperty({
    example: '7b305237-d0ad-48fd-bb06-e2d3a111a6e4',
    description: 'Unique room id',
  })
  public id: string;

  @ApiProperty({ example: 1, description: 'Room`s number' })
  public roomNumber: number;

  @ApiProperty({
    example: {
      adults: 2,
      children: 0,
    },
    description: 'Room`s capacity',
  })
  public capacity: { adults: number; children: number };

  @ApiProperty({ example: 'USD', description: 'Currency for payment' })
  public currency: string;

  @ApiProperty({ example: 50, description: 'Room`s price' })
  public pricePerNight: number;

  @ApiProperty({
    example: 'Cozy cabin retreat with fireplace.',
    description: 'Room`s description',
  })
  public description: string;

  @ApiProperty({ example: false, description: 'Is room already booked' })
  public isBooked: boolean;

  constructor(
    id: string,
    roomNumber: number,
    capacity: { adults: number; children: number },
    currency: string,
    pricePerNight: number,
    description: string,
    booked: boolean,
  ) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.capacity = capacity;
    this.currency = currency;
    this.pricePerNight = pricePerNight;
    this.description = description;
    this.isBooked = booked;
  }
}
