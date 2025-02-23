import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageUsers } from './entity/image.entity';
import { Repository } from 'typeorm';
import * as sharp from 'sharp';
import { promises } from 'fs';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageUsers)
    private imageRepository: Repository<ImageUsers>,
  ) {}

  async createImage(image: Express.Multer.File, user: User) {
    if (user.image != null) {
      const filePath = `${image.destination}/${image.filename}`;
      const fileName = await this.convertToWebp(filePath);

      await this.imageRepository.update(user.image.id, { name: fileName });

      await promises.unlink(
        `${image.destination}/${user.image.name.split('/').pop()}`,
      );
      user.image.name = fileName;
      return user;
    }

    const filePath = `${image.destination}/${image.filename}`;
    const fileName = await this.convertToWebp(filePath);

    const newImage = this.imageRepository.create({ name: fileName, user });

    return this.imageRepository.save(newImage);
  }

  async convertToWebp(image: string) {
    const output = image.replace(/\.[^.]+$/, '.webp');

    await sharp(image).webp().toFile(output);

    await promises.unlink(image);

    return output;
  }
}
