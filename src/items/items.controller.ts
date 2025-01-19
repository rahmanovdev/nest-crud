import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Бардык items алуу' })
  @ApiResponse({
    status: 200,
    description: 'Ийгиликтүү алынды',
    type: [CreateDto],
  })
  @Get('/get-all')
  findAll() {
    return this.itemsService.getItems();
  }

  @ApiOperation({ summary: 'Жаңы item түзүү' })
  @ApiResponse({
    status: 201,
    description: 'Ийгиликтүү түзүлдү',
    type: CreateDto,
  })
  @Post('/create')
  async create(@Body() item: CreateDto) {
    console.log('Келген маалымат:', item);
    try {
      const result = await this.itemsService.createItem(item);
      console.log('Жооп:', result);
      return result;
    } catch (error) {
      console.error('Ката:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'ID боюнча item жаңыртуу' })
  @ApiParam({ name: 'id', required: true, description: 'Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Ийгиликтүү жаңыртылды',
    type: UpdateDto,
  })
  @Put('/update/:id')
  updateItem(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.itemsService.updateItem(+id, body);
  }

  @ApiOperation({ summary: 'ID боюнча item өчүрүү' })
  @ApiParam({ name: 'id', required: true, description: 'Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Ийгиликтүү өчүрүлдү',
  })
  @ApiResponse({
    status: 404,
    description: 'Item табылган жок',
  })
  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.deleteItem(id);
  }
}
