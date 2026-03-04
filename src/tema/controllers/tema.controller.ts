import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";


@Controller("/temas")
export class TemaController {
constructor(private readonly TemaService: TemaService){}

@Get()
@HttpCode(HttpStatus.OK)
findAlll():Promise<Tema[]>{
    return this.TemaService.findAll();
    
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id' , ParseIntPipe) id: number) : Promise<Tema>{
    return this.TemaService.findById(id);
}


@Get ('/descricao/:descricao')
@HttpCode(HttpStatus.OK)
findAllBydescricao(@Param('descricao') descricao: string) : Promise<Tema[]> {
    return this.TemaService.findAlllyDescricao(descricao);
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() tema: Tema): Promise<Tema>{
    return this.TemaService.create(tema);
}

@Put()
@HttpCode(HttpStatus.OK)
update(@Body() tema:Tema): Promise <Tema>{
    return this.TemaService.update(tema);
}

@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id' , ParseIntPipe) id:number){
    return this.TemaService.delete(id);
}
}