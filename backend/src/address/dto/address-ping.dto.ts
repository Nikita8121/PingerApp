import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { LocationEnum } from 'src/device/enums/location.enum';

export class AddressesPingDto {
  @IsEnum(LocationEnum)
  location: LocationEnum;
  @IsNumber()
  hamal: number;
  @IsNumber()
  numberOfFirstArea: number;
  @IsNumber()
  @IsOptional()
  numberOfLastArea?: number;
}
