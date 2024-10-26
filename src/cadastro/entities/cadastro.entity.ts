import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, Length, MinLength  } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('tb_cadastros')
export class Cadastro {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Precisa de ter exatamente 11 números e seguir a expressão regular /^[0-9]+$/'
    })
    @IsNotEmpty()
    @Length(11)
    @Column({ nullable: false, unique: true, length: 11 })
    cpf: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    nome: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    sobrenome: string

    @ApiProperty({
        description: 'Precisa de ter no mínimo 4 caracteres e no máximo 255'
    })
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(4)
    @Column({ nullable: false, length: 255 })
    senha: string

    @ApiProperty({
        description: 'Precisa de conter @ e ter no máximo 255 caracteres.'
    })
    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, unique: true ,length: 255 })
    email: string

}