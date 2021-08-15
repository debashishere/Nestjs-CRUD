import { IsAlpha } from "class-validator";

export class CreateUserDto {
  @IsAlpha()
  name: string
}
