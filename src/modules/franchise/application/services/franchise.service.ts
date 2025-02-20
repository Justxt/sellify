import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IFranchiseRepository } from '../../domain/interfaces/ifranchise.repository';
import { CreateFranchiseDto } from '../dto/franchise.dto';
import { Franchise } from '../../domain/entities/franchise.entity';
import { IPartnerRepository } from '../../../partner/application/interfaces/ipartner.repository';
import { IFranchiseService } from '../../domain/interfaces/ifranchise.service';

@Injectable()
export class FranchiseService implements IFranchiseService {
  constructor(
    @Inject('IFranchiseRepository')
    private readonly franchiseRepository: IFranchiseRepository,
    @Inject('IPartnerRepository')
    private readonly partnerRepository: IPartnerRepository,
  ) {}

  async create(
    createFranchiseDto: CreateFranchiseDto,
    partnerId: string,
  ): Promise<Franchise> {
    const existingFranchise = await this.franchiseRepository.findByName(
      createFranchiseDto.name,
    );
    if (existingFranchise) {
      throw new ConflictException('La franquicia ya existe');
    }

    const partner = await this.partnerRepository.findById(partnerId);
    if (!partner) {
      throw new NotFoundException('Partner no encontrado');
    }

    const franchise = new Franchise();
    franchise.name = createFranchiseDto.name;
    franchise.location = createFranchiseDto.location;
    franchise.partner = partner;

    return this.franchiseRepository.save(franchise);
  }

  async findByPartnerId(partnerId: string): Promise<Franchise[]> {
    return this.franchiseRepository.findByPartnerId(partnerId);
  }

  async delete(id: string, partnerId: string): Promise<void> {
    const franchise = await this.franchiseRepository.findById(id);
    if (!franchise) {
      throw new NotFoundException('Franquicia no encontrada');
    }

    if (franchise.partner.id !== partnerId) {
      throw new ForbiddenException(
        'No tiene permisos para eliminar esta franquicia',
      );
    }

    await this.franchiseRepository.delete(id);
  }
}
