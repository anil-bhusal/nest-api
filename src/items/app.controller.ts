import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { Item } from './item.entity';
import { ItemService } from './app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    async findAll(): Promise<{ status: number; message: string; data: Item[] }> {
        return this.itemService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<{ status: number; message: string; data?: Item }> {
        return this.itemService.findOne(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() item: Item): Promise<{ status: number; message: string; data?: Item; error?: any }> {
        return this.itemService.create(item);
    }

    //   @Delete(':id')
    //   remove(@Param('id') id: string): Promise<void> {
    //     return this.itemService.remove(+id);
    //   }
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ status: number; message: string }> {
        return this.itemService.remove(+id);
    }
}
