import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";


@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {

        return this.postagemRepository.find({
            relations: {
                aluno: {
                    cadastro: true
                }
            }
        })
    }

    async findById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            }, relations: {
                aluno: {
                    cadastro: true
                }
            }
        })

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return postagem
    }

    async findByTitle(titulo: string): Promise<Postagem[]> {

        let postagem = this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }, relations: {
                aluno: {
                    cadastro: true
                }
            }
        })

        if (!titulo)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return postagem
    }

    async create(postagem: Postagem): Promise<Postagem> {

        if (!postagem.descricao || !postagem.titulo)
            throw new HttpException('Postagem inválida!', HttpStatus.BAD_REQUEST)

        return this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {

        let postagemUpdate = await this.findById(postagem.id)
        
        if (!postagemUpdate)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return this.postagemRepository.save(postagem)
    }

    async delete(id: number): Promise<DeleteResult> {

        let postagemDelete = await this.findById(id)

        if (!postagemDelete)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return this.postagemRepository.delete(id)
    }
}