import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/cat-create.dto';
import { ConfigService } from '@nestjs/config';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    readonly configService: ConfigService,
    @Inject('TEST') readonly test: string,
    @Inject('TEST1') readonly catService1: CatService,
    @InjectRepository(Cat) readonly catRepository: Repository<Cat>,
  ) {}

  @Post('')
  @HttpCode(201)
  // @Bind(Query())
  getHello(@Body() body: CreateCatDto): string {
    return this.catService.getHello();
  }

  @Post('/use/value')
  @HttpCode(201)
  // @Bind(Query())
  getHello0(@Body() body: CreateCatDto): string {
    return this.test;
  }

  @Post('/use/class')
  @HttpCode(201)
  // @Bind(Query())
  getHello1(@Body() body: CreateCatDto): string {
    return this.catService1.getHello();
  }

  @Get('/config')
  @HttpCode(200)
  getConfig(): number {
    return this.configService.get<number>('app.port');
  }

  @Get()
  @HttpCode(200)
  async getCats(): Promise<Cat[]> {
    const rst = await this.catRepository.find();
    return rst;
  }
}
