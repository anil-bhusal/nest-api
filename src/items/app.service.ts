import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { ResponseService } from 'src/common/response.service';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
        private readonly responseService: ResponseService, // Inject the ResponseService
    ) { }

    findAll(): Promise<Item[]> {
        return this.itemsRepository.find();
    }

    findOne(id: number): Promise<Item> {
        return this.itemsRepository.findOneBy({ id });
    }

    create(item: Item): Promise<Item> {
        return this.itemsRepository.save(item);
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
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return this.responseService.success('Deleted successfully');
    }
}
