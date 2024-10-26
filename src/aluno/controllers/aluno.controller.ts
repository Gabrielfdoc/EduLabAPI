import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { Aluno } from "../entities/aluno.entity";
import { AlunoService } from "../services/aluno.service";

@ApiTags('Aluno')
@Controller('/aluno')
export class AlunoController {
    constructor(
        private readonly service: AlunoService
    ) { }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Aluno[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um aluno existente no banco de dados!',
        type: Number
      })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Aluno> {
        return this.service.findById(id)
    }
}