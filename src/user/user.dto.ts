export class CreateUserDto {
  id!: string;
  name!: string;
  login!: string;
}

export class UpdateUserDto {
  name!: string;
  login!: string;
  password!: string;
}
