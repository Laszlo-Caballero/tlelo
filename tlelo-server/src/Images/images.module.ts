import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUsers } from './entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageUsers])],
  providers: [ImagesService],
})
export class ImagesModule {}
