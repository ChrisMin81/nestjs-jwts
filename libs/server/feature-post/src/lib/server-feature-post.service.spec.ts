import { Test } from '@nestjs/testing';
import { ServerFeaturePostService } from './server-feature-post.service';
import { IAdminUser, IPost } from '@fst/shared/domain';

describe('ServerFeaturePostService', () => {
  let service: ServerFeaturePostService;
  const userId = 'default_user_id';
  const default_user: IAdminUser = {
    userId,
    email: 'test@email.com',
    password: 'password',
    posts: [],
    roles: [],
    isAdmin: false,
    username: 'default_username'
  };

  function getData(data?: Partial<IPost>): IPost {
    return {
      id: data?.id || 'default_id',
      title: data?.title || 'default_title',
      description: data?.description || 'default_description',
      author: { userId },
      isPublished: data?.isPublished !== undefined ? data?.isPublished : false
    };
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerFeaturePostService]
    }).compile();

    service = module.get(ServerFeaturePostService);
  });
  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should clear the list of posts', () => {
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toBeGreaterThanOrEqual(1);
    service.clearAll();
    expect(service.getAll().length).toEqual(0);
  });

  it('should return a list of posts', () => {
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toBeGreaterThanOrEqual(1);
    service.clearAll();
    expect(service.getAll().length).toEqual(0);
  });

  it('should create a new post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    expect(
      service.create(getData(), userId)
    ).toHaveProperty('id');
  });
  it('should should return an existing post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    const newPost = service.create(getData(), userId);
    expect(newPost).toHaveProperty('id');

    expect(service.getOne(newPost.id, default_user)).toEqual(newPost);
  });

  it('should should throw an exception if a post is not found', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    const newPost = service.create(getData(), userId);
    expect(newPost).toHaveProperty('id');

    expect(service.getOne(newPost.id)).toBeNull();

  });

  it('should should update an existing post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    const newPost = service.create(getData(), userId);
    expect(newPost).toHaveProperty('id');

    expect(
      service.update(newPost.id, {
        title: 'new title',
        description: 'new description'
      }, default_user)
    ).toEqual({
      ...newPost,
      ...{
        title: 'new title',
        description: 'new description'
      }
    });
  });
  it('should should delete an existing post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    const newPost = service.create(getData(), userId);
    expect(newPost).toHaveProperty('id');

    expect(service.delete(newPost.id, default_user)).toEqual(newPost);
  });
});
