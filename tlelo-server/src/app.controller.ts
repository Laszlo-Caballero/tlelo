import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

@Controller('images')
export class AppController {
  @Get(':fileName')
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', fileName);
    res.sendFile(filePath);
  }
}
