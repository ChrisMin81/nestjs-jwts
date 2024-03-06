import { Test } from '@nestjs/testing';
import { ServerFeaturePostService } from './server-feature-post.service';

describe('ServerFeaturePostService', () => {
  let service: ServerFeaturePostService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerFeaturePostService],
    }).compile();

    service = module.get(ServerFeaturePostService);

  });
  it('should be defined', () => {
    expect(service).toBeTruthy();
  });


  it('should clear the list of posts', () => {
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(1);
    service.clearAll();
    expect(service.getAll().length).toEqual(0);
  });

  it('should return a list of posts', () => {
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(1);
    service.clearAll();
    expect(service.getAll().length).toEqual(0);
  });

  it('should create a new post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    expect(service.create({
      title: 'test title',
      description: 'test description'
    })).toHaveProperty('id');
  });
  it('should should return an existing post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    const newPost = service.create({
      title: 'test title',
      description: 'test description'
    });
    expect(newPost).toHaveProperty('id');

    expect(service.getOne(newPost.id)).toEqual(newPost);
  });
  it('should should update an existing post', () => {
    service.clearAll();
    expect(service.getAll()).toBeTruthy();
    expect(service.getAll().length).toEqual(0);

    const newPost = service.create({
      title: 'test title',
      description: 'test description'
    });
    expect(newPost).toHaveProperty('id');

    expect(service.update(newPost.id, {
      title: 'new title',
      description: 'new description'
    })).toEqual({
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

    const newPost = service.create({
      title: 'test title',
      description: 'test description'
    });
    expect(newPost).toHaveProperty('id');

    expect(service.delete(newPost.id)).toEqual(newPost);
  });
});
