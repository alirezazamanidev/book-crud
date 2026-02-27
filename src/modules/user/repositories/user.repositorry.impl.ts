import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { IUserRepository } from "../domain/repositories/user.repository.port";
import { User } from "../domain/User";

@Injectable()
export class UserRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaService) { }
  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { uid: user.id },
      update: {
        username: user.userName,
        hash_password: user.hashPassword,
        fullname: user.fullName,
        is_verify: user.isVerify
      },
      create: {
        uid: user.id,
        username: user.userName,
        hash_password: user.hashPassword,
        fullname: user.fullName,
        is_verify: user.isVerify
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.prisma.user.findUnique({ where: { uid: id } });
    if (!entity) return null;
    return User.reconstitute({
      id: entity.uid,
      userName: entity.username,
      hashPassword: entity.hash_password,
      fullName: entity.fullname,
      isVerify: entity.is_verify,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.prisma.user.findUnique({
      where: { username },

    })
    if (!entity) return null;
    return User.reconstitute({
      id: entity.uid,
      userName: entity.username,
      hashPassword: entity.hash_password,
      fullName: entity.fullname,
      isVerify: entity.is_verify,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at
    })


  }

  async exists(id: string): Promise<boolean> {
    return await this.prisma.user.count({ where: { uid: id } }) > 0;
  }
}
