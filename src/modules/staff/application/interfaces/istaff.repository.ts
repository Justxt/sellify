import { UUID } from "crypto";
import { Staff } from "../../domain/entities/staff.entity";

export interface IStaffRepository {
    findAll(): Promise<Staff[]>;
    findByUsername(username: string): Promise<Staff | undefined>;
    findById(id: UUID): Promise<Staff | undefined>;
    update(id: UUID, staff: Partial<Staff>): Promise<Staff>;
    delete(id: UUID): Promise<void>;
    save(staff: Staff): Promise<Staff>;
    }


