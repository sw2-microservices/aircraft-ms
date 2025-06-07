import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
import { PrismaClient } from 'generated/prisma';

import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

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

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const totalPages = await this.aircraft.count({
      where: {
        available: true,
      }
    }).then(total => {
      return Math.ceil(total / limit);
    });

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.aircraft.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          available: true,
        }
      }),
      meta: {
        totalPages: totalPages,
        currentPage: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: string) {
    const aircraft = await this.aircraft.findFirst({
      where: {
        id: id,
        available: true,
      }
    });

    if (!aircraft) {
      throw new RpcException({ 
        message: `Aircraft with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }

    return aircraft;
  }

  async update(id: string, updateAircraftDto: UpdateAircraftDto) {

    const { id: _, ...data } = updateAircraftDto;

    await this.findOne(id);
    
    return this.aircraft.update({
      where: { id: id },
      data: data
    })
  }

  async remove(id: string) {

    await this.findOne(id);

    // return this.aircraft.delete({
    //   where: { id: id }
    // })

    const aircraft = await  this.aircraft.update({
      where: { id: id },
      data: {
        available: false,
      }
    });

    return aircraft;
  }
}
