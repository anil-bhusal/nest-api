import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { ResponseService } from 'src/common/response.service';
import { CreateItemDto } from './item.dto';
import { validateCreateItemDto } from './item-validation';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
        private readonly responseService: ResponseService, // Inject the ResponseService
    ) { }

    async findAll(): Promise<{ status: number; message: string; data: Item[] }> {
        const items = await this.itemsRepository.find();
        if (!items || items.length === 0) {
            return this.responseService.notFound('Items not found', []);
        }
        return this.responseService.successWithData('Items retrieved successfully', items);
    }

    async findOne(id: number): Promise<{ status: number; message: string; data?: Item }> {
        const item = await this.itemsRepository.findOneBy({ id });
        if (!item) {
            return this.responseService.notFound(`Item with ID ${id} not found`);
        }
        return this.responseService.successWithData('Item retrieved successfully', item);
    }

    // async create(item: Item): Promise<{ status: number; message: string; data?: Item }> {
    //     try {
    //         const newItem = await this.itemsRepository.save(item);
    //         return this.responseService.successWithData('Item created successfully', newItem);
    //     } catch (error) {
    //         return this.responseService.error('Error creating item', error.message);
    //     }
    // }

    async create(createItemDto: CreateItemDto): Promise<{ status: number; message: string; data?: Item }> {
        // Custom validation logic
        const validationErrors = validateCreateItemDto(createItemDto);
        if (validationErrors.length > 0) {
            return this.responseService.error('Validation failed', validationErrors);
        }

        try {
            const newItem = this.itemsRepository.create(createItemDto);
            await this.itemsRepository.save(newItem);
            return this.responseService.successWithData('Item created successfully', newItem);
        } catch (error: any) {
            return this.responseService.error('Error creating item', error.message);
        }
    }

    // async remove(id: number): Promise<void> {
    //     const result = await this.itemsRepository.delete(id);
    //     if (result.affected === 0) {
    //         throw new NotFoundException(`Item with ID ${id} not found`);
    //     }
    // }

    async remove(id: number): Promise<{ status: number; message: string }> {
        const result = await this.itemsRepository.delete(id);
        if (result.affected === 0) {
            // throw new NotFoundException(`Item with ID ${id} not found`);
            return this.responseService.notFound(`Item with ID ${id} not found`)
        }
        return this.responseService.success('Deleted successfully');
    }
}
