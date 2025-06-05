import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
import { PaginatinoDto } from 'src/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  //@Post()
  @MessagePattern({ cmd: 'create_aircraft' })
  create(@Payload() createAircraftDto: CreateAircraftDto) {
    return this.aircraftService.create(createAircraftDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'find_all_aircrafts' })
  findAll(@Payload() paginationDto: PaginatinoDto) {
    return this.aircraftService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'find_one_aircraft' })
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.aircraftService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_aircraft' })
  update(@Payload() updateAircraftDto: UpdateAircraftDto) {
    return this.aircraftService.update(updateAircraftDto.id, updateAircraftDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'remove_aircraft' })
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.aircraftService.remove(id);
  }
}
