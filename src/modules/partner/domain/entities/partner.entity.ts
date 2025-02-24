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
import { Staff } from 'src/modules/staff/domain/entities/staff.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PartnerUser, (partnerUser) => partnerUser.partner_)
  employees: PartnerUser[];

  @OneToMany(() => Franchise, (franchise) => franchise.partner)
  franchises: Franchise[];

  @OneToMany(() => Staff, (staff) => staff.partner_)
  staff: Staff[];

  @Column({ type: 'enum', enum: BusinessType, default: BusinessType.AUTOSERVICIO })
  businessType: BusinessType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
