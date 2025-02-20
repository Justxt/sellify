import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartnerUser } from './partnerUser.entity';
import { Franchise } from '../../../franchise/domain/entities/franchise.entity';
import { BusinessType } from '../enums/business-type.enum';
import { UUID } from 'crypto';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PartnerUser, (partnerUser) => partnerUser.partner_)
  employees: PartnerUser[];

  @OneToMany(() => Franchise, (franchise) => franchise.partner)
  franchises: Franchise[];

  @Column({ type: 'enum', enum: BusinessType, default: BusinessType.AUTOSERVICIO })
  businessType: BusinessType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
