import { InjectRepository } from "@nestjs/typeorm";
import { Aluno } from "../entities/aluno.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class AlunoService {

    constructor(
        @InjectRepository(Aluno)
        private alunoRepository: Repository<Aluno>,
    ) { }

    async findAll(): Promise<Aluno[]> {
        return this.alunoRepository.find({
            relations: {
                cadastro: true,
                postagens: true
            }
        })
    }

    async findById(id: number): Promise<Aluno> {

        let alunoSearch = await this.alunoRepository.findOne({
            where: {
                id
            }, relations: {
                cadastro: true,
                postagens: true
            }
        })

        if (!alunoSearch) {
            throw new HttpException('Aluno não encontrado no sistema!', HttpStatus.NOT_FOUND)
        }

        return alunoSearch
    }

}