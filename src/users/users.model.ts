export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string,
    public phone: string,
    public bookings: Booking[],
  ) {}
}

export class Booking {
  constructor(
    public id: string,
    public roomId: string,
    public bookingDate: { checkIn: Date; checkOut: Date },
  ) {}
}
