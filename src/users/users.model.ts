import { ApiProperty } from '@nestjs/swagger';

export class Booking {
  @ApiProperty({
    example: '1ae1c9dd-2853-4394-9a05-b26e70973221',
    description: 'Unique booking id',
  })
  public id: string;

  @ApiProperty({
    example: '1ae1c9dd-2853-4394-9a05-b26e70973221',
    description: 'Unique booked room id',
  })
  public roomId: string;

  @ApiProperty({
    example:
      "{ checkIn: 'Sat Apr 27 2024 18:12:28 GMT+0300', checkOut: 'Sat Apr 27 2024 18:28 GMT+0300' }",
  })
  public bookingDate: { checkIn: Date; checkOut: Date };

  constructor(
    id: string,
    roomId: string,
    bookingDate: { checkIn: Date; checkOut: Date },
  ) {
    this.id = id;
    this.roomId = roomId;
    this.bookingDate = bookingDate;
  }
}

export class User {
  @ApiProperty({
    example: '1ae1c9dd-2853-4394-9a05-b26e70973221',
    description: 'Unique user id',
  })
  public id: string;

  @ApiProperty({ example: 'David', description: "User's first name" })
  public firstName: string;

  @ApiProperty({ example: 'Monro', description: "User's last name" })
  public lastName: string;

  @ApiProperty({ example: 21, description: "User's age" })
  public age: number;

  @ApiProperty({ example: 'example@example.com', description: "User's email" })
  public email: string;

  @ApiProperty({
    example: '+(380)95-107-87-54',
    description: "User's phone number",
  })
  public phone: string;

  @ApiProperty({
    example: [
      new Booking(
        '1ae1c9dd-2853-4394-9a05-b26e70973221',
        '1ae1c9dd-2853-4394-9a05-b26e70973221',
        {
          checkIn: new Date(),
          checkOut: new Date(),
        },
      ),
    ],
    description: "User's booking array",
  })
  public bookings: Booking[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    phone: string,
    bookings: Booking[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.phone = phone;
    this.bookings = bookings;
  }
}
