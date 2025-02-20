import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from './partner.entity';
import { Role } from 'src/modules/super/domain/enums/sRole.enum';
import { UUID } from 'crypto';

@Entity()
export class PartnerUser {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.pAdmin })
  role: Role;

  @ManyToOne(() => Partner, (partner) => partner.employees)
  partner_: Partner;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
