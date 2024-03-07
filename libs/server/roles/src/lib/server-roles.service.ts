import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { RolesBuilder } from 'nest-access-control';
import { AppRole } from '@fst/shared/domain';

interface Grant {
  role: string;
  resource: string;
  action: string;
  attributes?: string;
}

interface Role {
  role: string;
  description?: string;
}

interface Resource {
  resource: string;
  action: string;
  attributes?: string;
}

interface RoleToResourceMapping {
  role: string;
  resource: Resource[];
}

const roles: Role[] = [
  { role: AppRole.ADMIN_UPDATE_OWN_POST },
  { role: AppRole.USER_CREATE_ANY_POST },
];
const roleToResourceMappings: RoleToResourceMapping[] = [
  {
    role: AppRole.ADMIN_UPDATE_OWN_POST,
    resource: [
      { resource: 'posts', action: 'create:any', attributes: '*, !views' },
      { resource: 'posts', action: 'read:any', attributes: '*' },
      { resource: 'posts', action: 'update:any', attributes: '*, !views' },
      { resource: 'posts', action: 'delete:any', attributes: '*' },
    ],
  },
  {
    role: AppRole.USER_CREATE_ANY_POST,
    resource: [
      { resource: 'posts', action: 'create:own', attributes: '!description, !isPublished' }, // prettier-ignore
      { resource: 'posts', action: 'read:any', attributes: '*' },
      { resource: 'posts', action: 'update:own', attributes: '*, !rating, !views' }, // prettier-ignore
      { resource: 'posts', action: 'delete:own', attributes: '*' },
      // # fmt: oon
    ],
  },
];
// { role: 'admin', resource: 'posts', action: 'create:any', attributes: '*, !views' },
const grantList: Grant[] = (function () {
  const grants: Grant[] = [];
  roleToResourceMappings.forEach((m) => {
    m.resource.forEach((r) => {
      const grant = {
        role: m.role,
        resource: r.resource,
        action: r.action,
        attributes: r.attributes,
      };
      if (!grants.includes(grant)) {
        // eliminate duplicates
        grants.push(grant);
      }
    });
  });
  return grants;
})();

@Injectable()
export class ServerRolesService {
  private posts$$ = new BehaviorSubject<Grant[]>(grantList);

  clearAll() {
    this.posts$$.next([]);
  }

  async getRolesBuilderForAllRoles(): Promise<RolesBuilder> {
    return new RolesBuilder(this.posts$$.value);
  }
}
