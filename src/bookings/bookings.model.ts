export class Booking {
  constructor(
    public id: string,
    public userId: string,
    public roomId: string,
    public bookingDate: { checkIn: Date; checkOut: Date },
  ) {}
}
