import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Role } from '../enums/staffRole.enum';
import { Franchise } from 'src/modules/franchise/domain/entities/franchise.entity';
import { Partner } from 'src/modules/partner/domain/entities/partner.entity';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.CASHIER })
  role: Role;

  @ManyToMany(() => Franchise, (franchise) => franchise.staff)
  @JoinTable({
    name: "staff_franchise", // es el nombre de la tabla
    joinColumn: {
      name: "staff_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "franchise_id",
      referencedColumnName: "id"
    }
  })
  franchises: Franchise[];

  @ManyToOne(() => Partner, (partner) => partner.staff)
  @JoinColumn({ name: 'partner_id' })
  partner_: Partner;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
