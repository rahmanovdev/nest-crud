import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  // 1. Бардык itemsдерди алуу (Read)
  async getItems() {
    return await this.prismaService.user.findMany();
  }

  // 2. Жаңы item кошуу (Create)
  async createItem(item: CreateDto) {
    console.log('Service алган маалымат:', item);
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: item.name,
          email: item.email,
        },
      });
      console.log('Түзүлгөн колдонуучу:', user);
      return user;
    } catch (error) {
      console.error('Service катасы:', error);
      throw error;
    }
  }

  // 3. ID боюнча item жаңыртуу (Update)

  async updateItem(id: number, updateItem: UpdateDto) {
    const update = await this.prismaService.user.update({
      where: { id },
      data: updateItem,
    });
    return update;
  }

  async deleteItem(id: number) {
    await this.prismaService.user.delete({
      where: { id },
    });
    return { message: 'Item успешно удален' };
  }
}
