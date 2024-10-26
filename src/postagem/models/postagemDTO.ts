import { IsNotEmpty, MaxLength } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class PostagemDTO {

    @ApiProperty()
    @Expose({name: "id"})
    id: number

    @ApiProperty({
        description: 'Pode conter no máximo 500 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(255)
    @Expose({name: "titulo"})
    titulo: string

    @ApiProperty({
        description: 'Pode conter entre 20 e 5000 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(5000)
    @Expose({name: "descricao"})
    descricao: string

    @ApiProperty({
        description: 'Pode conter entre 10 e 500 caracteres, porém é opcional'
    })
    @IsNotEmpty()
    @MaxLength(500)
    @Expose({name: "anexo"})
    anexo: string

    @ApiProperty()
    @IsNotEmpty()
    @Expose({name: "data_postagem"})
    dataPostagem: Date

    @ApiProperty()
    @Expose({name: "aluno_id"})
    aluno: number
}