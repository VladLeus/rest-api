export class Room {
  constructor(
    public id: string,
    public roomNumber: number,
    public capacity: { adults: number; children: number },
    public currency: string,
    public pricePerNight: number,
    public description: string,
    public booked: boolean,
  ) {}
}
