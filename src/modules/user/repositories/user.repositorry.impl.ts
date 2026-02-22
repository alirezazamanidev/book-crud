import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { IUserRepository } from "../domain/repositories/user.repository.port";
import { User } from "../domain/User";

@Injectable()
export class UserRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaService) { }
  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        username: user.userName,
        hashPassword: user.hashPassword,
        fullName: user.fullName,
        isVerify: user.isVerify
      },
      create: {
        id: user.id,
        username: user.userName,
        hashPassword: user.hashPassword,
        fullName: user.fullName,
        isVerify: user.isVerify
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.prisma.user.findUnique({
      where: { username }
    })
    if (!entity) return null;
    return User.reconstitute({
      id: entity.id,
      userName: entity.username,
      hashPassword: entity.hashPassword,
      fullName: entity.fullName,
      isVerify: entity.isVerify,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })


  }

  async exists(id: string): Promise<boolean> {
    return await this.prisma.user.count({ where: { id } }) > 0;
  }
}
