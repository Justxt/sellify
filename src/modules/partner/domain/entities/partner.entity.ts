import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PartnerUser } from './partnerUser.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PartnerUser, (partnerUser) => partnerUser.partner_)
  users: PartnerUser[];
}
