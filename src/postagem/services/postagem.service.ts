import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class PostagemService{
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        //SELECT * FROM  tb_postagens
        return this.postagemRepository.find();
    }

    async findById(id: number) : Promise<Postagem>{
        // SELECT * FROM tb_postagens WHERE id = ?;
        const postagem = await this.postagemRepository.findOne({
            where:{
                    id}
    })

    if(!postagem) 
        throw new HttpException('Postagem não encontrada!' , HttpStatus.NOT_FOUND)

    return postagem;
    }

    async findAlllByTitulo(titulo: string) : Promise <Postagem[]>{
        // SELECT * FROM tb_postagens WHERE titulo LIKE '%?%';
        return this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`) //Iike (ignora maiusculo e minusculo )
            }
    })
    }

    async create(postagem: Postagem) : Promise<Postagem>{
        return await this.postagemRepository.save(postagem);
    }

     
    async update(postagem: Postagem) : Promise<Postagem>{
        if(!postagem.id || postagem.id <=0 )
            throw new HttpException("O ID da postagem é inválido!" , HttpStatus.BAD_REQUEST);
        await this.findById(postagem.id);

        return this.postagemRepository.save(postagem);
    }

    async delete(id: number) : Promise<DeleteResult>{
        await this.findById(id);
        
        //Delete tb_postagens FROM id = ?
        return this.postagemRepository.delete(id);
    }


}