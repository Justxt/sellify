import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from '../../../partner/domain/entities/partner.entity';
import { Staff } from 'src/modules/staff/domain/entities/staff.entity';

@Entity()
export class Franchise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Partner, (partner) => partner.franchises)
  @JoinColumn({ name: 'partnerId' })
  partner: Partner;

  @OneToMany(() => Staff, (staff) => staff.partner_)
  staff: Staff[];
}
