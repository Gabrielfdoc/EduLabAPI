import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CadastroTemporarioAlunoDTO } from "../model/cadastrotemporarioalunodto";
import { Aluno } from "../../aluno/entities/aluno.entity";
import { Cadastro } from "../entities/cadastro.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { matches } from "class-validator";

@Injectable()
export class CadastroService {

    constructor(
        @InjectRepository(Cadastro)
        private cadastroRepository: Repository<Cadastro>,

        @InjectRepository(Aluno)
        private alunoRepository: Repository<Aluno>
    ) { }



    async createAluno(cadastroTemporarioAlunoDTO: CadastroTemporarioAlunoDTO): Promise<Aluno> {

        if (!matches(cadastroTemporarioAlunoDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioAlunoDTO.email || !cadastroTemporarioAlunoDTO.email.includes("@")) {
            throw new HttpException('E-mail já cadastrado!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let aluno: Aluno = new Aluno()

        cadastro.email = cadastroTemporarioAlunoDTO.email
        cadastro.nome = cadastroTemporarioAlunoDTO.nome
        cadastro.cpf = cadastroTemporarioAlunoDTO.cpf
        cadastro.sobrenome = cadastroTemporarioAlunoDTO.sobrenome
        cadastro.senha = cadastroTemporarioAlunoDTO.senha

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        aluno.cadastro = novoCadastro

        return this.alunoRepository.save(aluno)
    }

    async findAll(): Promise<Cadastro[]> {

        return this.cadastroRepository.find({
            relations: {
            }
        })
    }

    async findById(id: number): Promise<Cadastro> {

        let cadastroProcurado = this.cadastroRepository.findOne({
            where: {
                id
            }, relations: {
            }
        })

        if (!cadastroProcurado) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return cadastroProcurado
    }

    async findAlunoById(id: number): Promise<Aluno> {

        const cadastroProcurado = this.alunoRepository.findOne({
            where: {
                id
            }, relations: {
                cadastro: true
            }
        })

        if (!cadastroProcurado) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return cadastroProcurado
    }

    async delete(id: number): Promise<DeleteResult> {

        let cadastroDeletar = this.findById(id)

        if (!cadastroDeletar) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.cadastroRepository.delete(id)
    }

    async updateAluno(cadastroTemporarioAlunoDTO: CadastroTemporarioAlunoDTO): Promise<Aluno> {

        const alunoUpdate = await this.findAlunoById(cadastroTemporarioAlunoDTO.id)

        if (!alunoUpdate || !cadastroTemporarioAlunoDTO.id) {
            throw new HttpException('Aluno não encontrado!', HttpStatus.NOT_FOUND)
        } else if (!matches(cadastroTemporarioAlunoDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioAlunoDTO.email || !cadastroTemporarioAlunoDTO.email.includes("@")) {
            throw new HttpException('E-mail já cadastrado!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let aluno: Aluno = new Aluno()

        cadastro.id = alunoUpdate.cadastro.id
        cadastro.email = cadastroTemporarioAlunoDTO.email
        cadastro.nome = cadastroTemporarioAlunoDTO.nome
        cadastro.cpf = cadastroTemporarioAlunoDTO.cpf
        cadastro.sobrenome = cadastroTemporarioAlunoDTO.sobrenome
        cadastro.senha = cadastroTemporarioAlunoDTO.senha

        aluno.id = cadastroTemporarioAlunoDTO.id

        const novoCadastro = await this.cadastroRepository.save(cadastro)

        aluno.cadastro = novoCadastro

        return this.alunoRepository.save(aluno)
    }

    async findByName(nome: string): Promise<Cadastro[]> {

        return this.cadastroRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }, relations: {

            }
        })
    }
}