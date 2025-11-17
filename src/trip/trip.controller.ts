import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TripService } from './trip.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CompliteTripDto, TripRequestDto } from './dto';

function Log() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log(`Calling ${propertyKey} with`, args);
      const result = await original.apply(this, args);
      console.log(`Result:`, result);
      return result;
    };
  };
}

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) { }

  @ApiOperation({summary: 'Завершить поездку (для водителя)'})
  @Post(':id/complite')
  async compliteTrip(
    @Param('id', ParseUUIDPipe) tripId: string,
    @Body() compliteTripDto: CompliteTripDto
  ): Promise<void> {
    const driverId = '123'
    await this.tripService.compliteTrip(tripId, driverId, compliteTripDto)
  }

  @ApiOperation({summary: 'Завершить поездку (для водителя)'})
  @Post('/request')
  async requestTrip(
    @Body() tripRequestDto: TripRequestDto
  ): Promise<void> {
    await this.tripService.requestTrip(tripRequestDto)
  }
}
