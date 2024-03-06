import { IUser } from '@fst/shared/domain';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ServerUsersService {
    private users$$ = new BehaviorSubject<IUser[]>([
        {
            userId: `18a36358-9882-4ea5-bf3e-2b5852399ba8`,
            email: 'john@test.com',
            username: 'john',
            password: 'changeme',
        },
        {
            userId: `18a36358-9882-4ea5-bf3e-2b5852399ba9`,
            email: 'maria@test.com',
            username: 'maria',
            password: 'guess',
        },
    ]);

    async findOneByEmail(email: string): Promise<IUser | undefined> {
        return this.users$$.value.find(user => user.email === email);
    }
    async findOneById(userId: string): Promise<IUser | undefined> {
        return this.users$$.value.find(user => user.userId === userId);
    }
}
