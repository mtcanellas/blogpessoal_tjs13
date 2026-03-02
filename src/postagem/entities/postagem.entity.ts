import { IsNotEmpty } from "class-validator";
import { Column , Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Transform, TransformFnParams} from "class-transformer"



@Entity({name: 'tb_postagens'}) // CREATE TABLE tb_postagens 
export class Postagem{

@PrimaryGeneratedColumn() //PRIMARY KEY AUTO (id) INCREMENT
id: number;

@Transform(({value} : TransformFnParams) => value?.trim()) //remover espaos em branco Inicio/Fim
@IsNotEmpty() //Força digitação
@Column({length: 100, nullable: false}) // varchar(100) NOT NULLL
 titulo: string;


@Transform(({value} : TransformFnParams) => value?.trim()) //remover espaos em branco Inicio/Fim
@IsNotEmpty() //Força digitação
@Column ({length: 1000, nullable: false}) // varchar(1000) not null
texto: string;


@UpdateDateColumn() // atualiza a data da criação e atualização 
data: Date;

}