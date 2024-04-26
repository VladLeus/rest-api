export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string,
    public phone: string,
    public bookingsId?: string[],
  ) {}
}
