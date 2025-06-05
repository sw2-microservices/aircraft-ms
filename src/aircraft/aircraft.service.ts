import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginatinoDto } from 'src/common/dto';
import { last } from 'rxjs';

@Injectable()
export class AircraftService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AircraftService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createAircraftDto: CreateAircraftDto) {
    return this.aircraft.create({
      data: createAircraftDto
    });
  }

  async findAll(paginationDto: PaginatinoDto) {

    const { page, limit } = paginationDto;

    const totalPages = await this.aircraft.count();

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.aircraft.findMany({
        take: limit,
        skip: (page - 1) * limit,
      }),
      meta: {
        totalPages: totalPages,
        currentPage: page,
        lastPage: lastPage,
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} aircraft`;
  }

  update(id: number, updateAircraftDto: UpdateAircraftDto) {
    return `This action updates a #${id} aircraft`;
  }

  remove(id: number) {
    return `This action removes a #${id} aircraft`;
  }
}
