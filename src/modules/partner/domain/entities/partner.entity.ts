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

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PartnerUser, (partnerUser) => partnerUser.partner_)
  users: PartnerUser[];

  @OneToMany(() => Franchise, (franchise) => franchise.partner)
  franchises: Franchise[];

  @Column({ type: 'enum', enum: BusinessType, default: BusinessType.AUTOSERVICIO })
  businessType: BusinessType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
