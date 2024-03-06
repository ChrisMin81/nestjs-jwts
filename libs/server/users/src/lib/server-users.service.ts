import { IUser } from '@fst/shared/domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { randomUUID } from 'crypto';
import { SignupDto } from '@fst/server/shared';

@Injectable()
export class ServerUsersService {
  private users$$ = new BehaviorSubject<IUser[]>([
    {
      userId: `18a36358-9882-4ea5-bf3e-2b5852399ba8`,
      email: 'john@test.com',
      username: 'john',
      password: 'changeme',
      isAdmin: true,
      posts: []
    },
    {
      userId: `18a36358-9882-4ea5-bf3e-2b5852399ba9`,
      email: 'maria@test.com',
      username: 'maria',
      password: 'guess',
      isAdmin: false,
      posts: []
    }
  ]);

  async findOneByEmail(email: string): Promise<IUser | undefined> {
    return this.users$$.value.find(user => user.email === email);
  }

  async findOneById(userId: string): Promise<IUser | undefined> {
    return this.users$$.value.find(user => user.userId === userId);
  }

  async createUser(data: SignupDto): Promise<IUser> {
    const user = await this.findOneByEmail(data.email);
    if (user) {
      throw new BadRequestException();
    }
    const currrent = this.users$$.value;

    const newUser = { ...data, posts: [], isAdmin: false, userId: `${randomUUID()}` } as IUser;
    this.users$$.next([...currrent, newUser]);
    return newUser;
  }
}
