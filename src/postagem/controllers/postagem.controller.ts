import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@ApiTags('Postagem')
@Controller('/postagem')
export class PostagemController {

    constructor(
        private readonly service: PostagemService
    ) { }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de uma postagem existente no banco de dados!',
        type: Number
      })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.service.findById(id)
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'titulo',
        required: true,
        description: 'Tem de ser o título de uma postagem existente no banco de dados!',
        type: Number
      })
    @Get('/busca/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.service.findByTitle(titulo)
    }

    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no Postagem',
        type: Postagem
      })
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.service.create(postagem)
    }

    @ApiOkResponse({ description: 'Recurso atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no Postagem e apresentar um ID existente no banco de dados.',
        type: Postagem
      })
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.service.update(postagem)
    }

    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'Deletado com sucesso!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de uma postagem existente no banco de dados!',
        type: Number
      })
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }
}