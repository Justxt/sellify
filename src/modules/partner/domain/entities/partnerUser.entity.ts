import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../../../super/domain/enums/sRole.enum';
import { Partner } from './partner.entity';

@Entity()
export class PartnerUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.pAdmin })
  role: Role;

  @ManyToOne(() => Partner, partner => partner.users)
  partner_: Partner;
}
