import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "../../aluno/entities/aluno.entity";

@Entity('tb_postagens')
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Pode conter no máximo 500 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(20)
    @Column({ nullable: false, length: 500 })
    titulo: string

    @ApiProperty({
        description: 'Pode conter entre 20 e 5000 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(5000)
    @MinLength(20)
    @Column({ nullable: false, length: 5000 })
    descricao: string

    @ApiProperty({
        description: 'Pode conter entre 10 e 500 caracteres, porém é opcional'
    })
    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(10)
    @Column({ nullable: false, length: 500 })
    anexo: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    dataPostagem: Date

    @ManyToOne(() => Aluno, (aluno) => aluno.postagens, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Aluno})
    aluno: Aluno
}