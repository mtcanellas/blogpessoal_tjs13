import { IsNotEmpty, Length } from "class-validator";
import { Column , Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Transform, TransformFnParams} from "class-transformer"
import { Tema } from "../../tema/entities/tema.entity";



@Entity({name: 'tb_postagens'}) // CREATE TABLE tb_postagens 
export class Postagem{

@PrimaryGeneratedColumn() //PRIMARY KEY AUTO (id) INCREMENT
id: number;

@Transform(({value} : TransformFnParams) => value?.trim()) //remover espaços em branco Inicio/Fim
@IsNotEmpty() //Força digitação
@Length(10, 1000, {message: " O texto deve ter entre 10 e  1000 caracteres"})
@Column({length: 100, nullable: false}) // varchar(100) NOT NULLL
 titulo: string;


@Transform(({value} : TransformFnParams) => value?.trim()) //remover espaços em branco Inicio/Fim
@IsNotEmpty() //Força digitação
@Column ({length: 1000, nullable: false}) // varchar(1000) not null
texto: string;


@UpdateDateColumn() // atualiza a data da criação e atualização 
data: Date;

@ManyToOne(() => Tema , (tema) => tema.postagem ,{
    onDelete: "CASCADE"
})
tema: Tema; // representa a chave estrangeira 
}