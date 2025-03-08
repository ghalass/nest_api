import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { email: string; password: string; name: string }) {
    // If no existing user is found, create a new user
    return this.prisma.user.create({ data });
  }

  async toogleActivateAccount(id: number) {
    // check if user exist
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) throw new NotFoundException("Compte n'existe pas.");
    // toogleActivateAccount
    const existingUserUp = await this.prisma.user.update({
      where: { id }, // Spécifie l'ID de l'utilisateur à mettre à jour
      data: { active: !existingUser.active }, // Met à jour la valeur de "active"
    });
    // remove passwor from user
    const { password: _, ...others } = existingUserUp;

    return others;
  }

  async findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
