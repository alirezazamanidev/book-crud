import { ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IUserRepository } from "../domain/repositories/user.repository.port";
import { USER_REPOSITORY } from "../user.constants";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../domain/User";
import { hashSync } from "bcrypt";

@Injectable()
export class UserService {


  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) { }

  async create(dto: CreateUserDto) {

    let user = await this.userRepository.findByUsername(dto.username);
    if (user) throw new ConflictException('The Username is already exists');
    const hashPassword = hashSync(dto.password, 10);
    user = User.create({
      username: dto.username,
      fullName: dto.fullname,
      hashPassword
    })
    await this.userRepository.save(user);
    return {
      id: user.id,
      username: user.userName,
      fullName: user.fullName,
      isVerify: user.isVerify
    };
  }
}
