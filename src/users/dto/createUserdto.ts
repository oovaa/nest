export class CreateUserDto {
  password: string;
  email: string;
}
export class CreateProfileDto {
  id: number;
  age: number;
  biography: string;
  userId: number;
}
