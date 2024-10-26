import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { AlunoController } from "../controllers/aluno.controller";
import { Aluno } from "../entities/aluno.entity";
import { AlunoService } from "../services/aluno.service";


@Module({
    imports: [TypeOrmModule.forFeature([Aluno, Cadastro])],
    providers: [AlunoService],
    controllers: [AlunoController],
    exports: [TypeOrmModule]
})

export class AlunoModule { }