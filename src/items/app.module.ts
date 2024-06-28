import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemService } from './app.service';
import { ItemController } from './app.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CommonModule],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}