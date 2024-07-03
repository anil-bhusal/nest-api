import { CreateItemDto } from './item.dto';
import { Item } from './item.entity';

export function validateCreateItemDto(createItemDto: CreateItemDto): string[] {
    const errors: string[] = [];

    const allowedFields: string[] = ['name', 'description', 'price', 'quantity', 'discount'];

    for (const field in createItemDto) {
        if (!allowedFields.includes(field as keyof CreateItemDto)) {
            errors.push(`Unallowed field: ${field}`);
        }
    }

    if (!createItemDto.name || typeof createItemDto.name !== 'string') {
        errors.push('Invalid name');
    }
    if (!createItemDto.description || typeof createItemDto.description !== 'string') {
        errors.push('Invalid description');
    }
    if (typeof createItemDto.price !== 'number' || createItemDto.price < 0) {
        errors.push('Invalid price');
    }
    if (typeof createItemDto.quantity !== 'number' || createItemDto.quantity < 0) {
        errors.push('Invalid quantity');
    }
    if (typeof createItemDto.discount !== 'number' || createItemDto.discount < 0) {
        errors.push('Invalid discount');
    }

    return errors;
}
