import { Injectable, ConflictException, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Staff } from '../../domain/entities/staff.entity';
import { StaffDTO } from '../dto/staff.dto';
import { IStaffRepository } from '../interfaces/istaff.repository';
import { IStaffService } from '../interfaces/istaff.service';
import { Partner } from 'src/modules/partner/domain/entities/partner.entity';
import { Franchise } from 'src/modules/franchise/domain/entities/franchise.entity';
import { IFranchiseRepository } from 'src/modules/franchise/domain/interfaces/ifranchise.repository';
import { IPartnerRepository } from 'src/modules/partner/application/interfaces/ipartner.repository';

@Injectable()
export class StaffService implements IStaffService {
  constructor(
    @Inject('IStaffRepository')
    private readonly staffRepository: IStaffRepository,
    @Inject('IFranchiseRepository')
    private readonly franchiseRepository: IFranchiseRepository,
    @Inject('IPartnerRepository')
    private readonly partnerRepository: IPartnerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(staffDto: StaffDTO, currentPartnerId: string): Promise<Staff> {
    const existingUser = await this.staffRepository.findByUsername(staffDto.username);
    if (existingUser) {
      throw new ConflictException('El usuario ya está registrado');
    }

    // Validar que el partner existe
    const partner = await this.partnerRepository.findById(currentPartnerId);
    if (!partner) {
      throw new NotFoundException('El partner no existe');
    }

    // Validate that all franchises exist
    const franchisePromises = staffDto.franchiseIds.map(id => 
      this.franchiseRepository.findById(id)
    );
    const franchises = await Promise.all(franchisePromises);
    
    if (franchises.some(franchise => !franchise)) {
      throw new NotFoundException('La franquicia no existe');
    }

    const hashedPassword = await bcrypt.hash(staffDto.password, 10);

    const staff = new Staff();
    staff.firstName = staffDto.firstName;
    staff.lastName = staffDto.lastName;
    staff.username = staffDto.username;
    staff.password = hashedPassword;
    staff.role = staffDto.role;
    staff.franchises = franchises.filter(f => f !== null) as Franchise[];
    staff.partner_ = partner; // Asignar el partner completo, no solo el id

    return this.staffRepository.save(staff);
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const staff = await this.staffRepository.findByUsername(username);
    if (!staff || !(await bcrypt.compare(password, staff.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: staff.id,
      username: staff.username,
      role: staff.role,
      partnerId: staff.partner_?.id || null,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
