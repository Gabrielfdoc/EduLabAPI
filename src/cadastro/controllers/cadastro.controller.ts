import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CadastroService } from "../services/cadastro.service";
import { DeleteResult } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";
import { Aluno } from "../../aluno/entities/aluno.entity";
import { CadastroTemporarioAlunoDTO } from "../model/cadastrotemporarioalunodto";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";

@ApiTags('Cadastro')
@Controller('/cadastro')
export class CadastroController {

    constructor(
        private readonly service: CadastroService
    ) { }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioAlunoDTO',
        type: CadastroTemporarioAlunoDTO
      })
    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @Post('/aluno')
    @HttpCode(HttpStatus.CREATED)
    createAluno(@Body() cadastroTemporarioAlunoDTO: CadastroTemporarioAlunoDTO): Promise<Aluno> {
        return this.service.createAluno(cadastroTemporarioAlunoDTO)
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um cadastro existente no banco de dados!',
        type: Number
      })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'O recurso foi deletado com sucesso!' })
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cadastro[]> {
        return this.service.findAll()
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioAlunoDTO e não é possível alterar o RG',
        type: CadastroTemporarioAlunoDTO
      })
    @ApiOkResponse({ description: 'O recurso foi atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @Put('/aluno')
    @HttpCode(HttpStatus.OK)
    updateAluno(@Body() cadastroTemporarioAlunoDTO: CadastroTemporarioAlunoDTO): Promise<Aluno> {
        return this.service.updateAluno(cadastroTemporarioAlunoDTO)
    }
}