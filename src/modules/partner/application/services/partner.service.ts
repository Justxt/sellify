import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PartnerUser } from '../../domain/entities/partnerUser.entity';
import { PartnerDTO } from '../dto/partner.dto';
import { Partner } from '../../domain/entities/partner.entity';
import { IPartnerService } from '../interfaces/ipartner.service';

@Injectable()
export class PartnerService implements IPartnerService {
    constructor(
        @InjectRepository(PartnerUser)
        private partnerRepository: Repository<PartnerUser>,
        @InjectRepository(Partner)
        private partner_Repository: Repository<Partner>,
        private jwtService: JwtService,
    ) {}

    async register(partnerDto: PartnerDTO): Promise<PartnerUser> {
        const existingUser = await this.partnerRepository.findOne({ 
            where: { username: partnerDto.username } 
        });
        
        if (existingUser) {
            throw new ConflictException('Partner ya registrado');
        }   

        const existingPartner = await this.partner_Repository.findOne({ 
            where: { name: partnerDto.partnerName } 
        });

        if (existingPartner) {
            throw new ConflictException('Empresa ya registrada');
        }

        let partner_ = await this.partner_Repository.findOne({ 
            where: { name: partnerDto.partnerName } 
        });

        if (!partner_) {
                partner_ = this.partner_Repository.create({ name: partnerDto.partnerName });
            await this.partner_Repository.save(partner_);
        }
    
        const hashedPassword = await bcrypt.hash(partnerDto.password, 10);
        
        const partner = this.partnerRepository.create({
            ...partnerDto,
            password: hashedPassword,
            partner_,
        });
    
        return this.partnerRepository.save(partner);
    }

    async login(username: string, password: string): Promise<{ access_token: string }> {
        const partner = await this.partnerRepository.findOne({ where: { username } });
        
        if (!partner || !(await bcrypt.compare(password, partner.password))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {
            sub: partner.id,
            username: partner.username,
            role: partner.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
