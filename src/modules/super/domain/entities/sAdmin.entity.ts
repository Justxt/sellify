import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/sRole.enum';

@Entity()
export class sAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.sAdmin })
  role: Role;
}
