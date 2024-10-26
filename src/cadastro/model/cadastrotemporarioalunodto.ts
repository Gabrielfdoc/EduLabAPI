import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class CadastroTemporarioAlunoDTO {

    @ApiProperty()
    id: number

    @ApiProperty({
        description: 'Precisa de ter exatamente 11 números e seguir a expressão regular /^[0-9]+$/'
    })
    @IsNotEmpty()
    @Length(11)
    cpf: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    nome: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    sobrenome: string

    @ApiProperty({
        description: 'Precisa de ter no mínimo 4 caracteres e no máximo 255'
    })
    @IsNotEmpty()
    @MaxLength(255)
    senha: string

    @ApiProperty({
        description: 'Precisa de conter @ e ter no máximo 255 caracteres.'
    })
    @IsNotEmpty()
    @MaxLength(255)
    email: string
}