import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";



@Entity ({name : "tb_temas"})
export class Tema {

//CRIAÇÃO ID
    @PrimaryGeneratedColumn()
    id: number;

    //criação da descrição do tema
    @IsNotEmpty()
    @Column ({length: 255 , nullable: false})
    descricao: string;


    //relacionamento com postagem
@OneToMany (() => Postagem , (postagem) => postagem.tema)
postagem: Postagem[];
}