import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PartnerUser } from '../../domain/entities/partnerUser.entity';
import { PartnerDTO } from '../dto/partner.dto';
import { Partner } from '../../domain/entities/partner.entity';
import { IPartnerService } from '../interfaces/ipartner.service';
import { IPartnerRepository } from '../interfaces/ipartner.repository';
import { IPartnerUserRepository } from '../interfaces/ipartnerUser.repository';

@Injectable()
export class PartnerService implements IPartnerService {
  constructor(
    @Inject('IPartnerUserRepository')
    private readonly partnerUserRepository: IPartnerUserRepository,
    @Inject('IPartnerRepository')
    private readonly partnerRepository: IPartnerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(partnerDto: PartnerDTO): Promise<PartnerUser> {
    const existingUser = await this.partnerUserRepository.findByUsername(
      partnerDto.username,
    );

    if (existingUser) {
      throw new ConflictException('Partner ya registrado');
    }

    const existingPartner = await this.partnerRepository.findByName(
      partnerDto.partnerName,
    );

    if (existingPartner) {
      throw new ConflictException('Empresa ya registrada');
    }

    let partner_ = await this.partnerRepository.findByName(
      partnerDto.partnerName,
    );

    if (!partner_) {
      partner_ = new Partner();
      partner_.name = partnerDto.partnerName;
      partner_.businessType = partnerDto.businessType;
      await this.partnerRepository.save(partner_);
    }

    const hashedPassword = await bcrypt.hash(partnerDto.password, 10);

    const partnerUser = new PartnerUser();
    partnerUser.username = partnerDto.username;
    partnerUser.password = hashedPassword;
    partnerUser.role = partnerDto.role;
    partnerUser.partner_ = partner_;

    return this.partnerUserRepository.save(partnerUser);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const partnerUser =
      await this.partnerUserRepository.findByUsername(username);

    if (
      !partnerUser ||
      !(await bcrypt.compare(password, partnerUser.password))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: partnerUser.id,
      username: partnerUser.username,
      role: partnerUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
