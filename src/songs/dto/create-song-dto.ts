import {IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    readonly title;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artists;

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}
