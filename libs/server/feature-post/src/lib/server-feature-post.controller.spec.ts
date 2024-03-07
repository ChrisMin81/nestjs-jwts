import { Test } from '@nestjs/testing';
import { ServerFeaturePostController } from './server-feature-post.controller';
import { ServerFeaturePostService } from './server-feature-post.service';
import { IAdminUser, IPost } from '@fst/shared/domain';
import { ServerRolesModule } from '@fst/server/roles';

describe('ServerFeaturePostController', () => {
  let controller: ServerFeaturePostController;
  let service: ServerFeaturePostService;
  const userId = 'default_user_id';
  const default_user: IAdminUser = {
    userId,
    email: 'test@email.com',
    password: 'password',
    posts: [],
    roles: [],
    isAdmin: false,
    username: 'default_username',
  };

  function getData(data?: Partial<IPost>): IPost {
    return {
      id: data?.id || 'default_id',
      title: data?.title || 'default_title',
      description: data?.description || 'default_description',
      author: { userId },
      isPublished: data?.isPublished !== undefined ? data?.isPublished : false,
    };
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ServerRolesModule],
      providers: [ServerFeaturePostService],
      controllers: [ServerFeaturePostController],
    }).compile();

    controller = module.get(ServerFeaturePostController);
    service = module.get(ServerFeaturePostService);
    service.clearAll();
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  it('should be return an empty list of posts', () => {
    const result = controller.getAll(default_user);
    expect(result).toBeTruthy();
    expect(result.length).toEqual(0);
  });

  it('should create a post and persist it to the DB', () => {
    const data = getData();
    const result = controller.create(data, userId);
    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.isPublished).toBeDefined();
    expect(result.author).toBeTruthy();
    expect(result.description).toBeTruthy();
    expect(result.title).toBeTruthy();

    const posts = controller.getAll(default_user);
    expect(posts).toBeTruthy();
    expect(posts.length).toEqual(1);
  });

  it('should return a post for a existing id', () => {
    const data = getData();
    const createdPost = controller.create(data, userId);
    expect(createdPost).toBeTruthy();
    expect(createdPost.id).toBeTruthy();

    // check that an entry was created
    const posts = controller.getAll(default_user);
    expect(posts).toBeTruthy();
    expect(posts.length).toEqual(1);

    // test
    const result = controller.getOne(createdPost.id, default_user);
    expect(result).toBeTruthy();
    expect(result).toEqual(createdPost);
  });

  it('should update a post and persist the changes it to the DB', () => {
    const data = getData({
      id: '1',
      title: 'myTitle1',
      description: 'myDescription1',
    });
    const createdPost = controller.create(data, userId);
    expect(createdPost).toBeTruthy();
    expect(createdPost.id).toBeTruthy();
    expect(createdPost.isPublished).toBeFalsy();
    expect(createdPost.title).toEqual('myTitle1');
    expect(createdPost.description).toEqual('myDescription1');

    // check that an entry was created
    let posts = controller.getAll(default_user);
    expect(posts).toBeTruthy();
    expect(posts.length).toEqual(1);

    // test
    const result = controller.update(
      createdPost.id,
      {
        title: 'myTitle2',
        description: 'myDescription2',
        isPublished: true,
      },
      default_user
    );
    expect(result).toBeTruthy();
    expect(result.id).toEqual(createdPost.id);
    expect(result.isPublished).toBeTruthy();
    expect(result.title).toEqual('myTitle2');
    expect(result.description).toEqual('myDescription2');

    // check that no additional entry was created
    posts = controller.getAll(default_user);
    expect(posts).toBeTruthy();
    expect(posts.length).toEqual(1);
  });
  it('should delete a post and remove it from the DB', () => {
    const data = getData();
    const createdPost = controller.create(data, userId);
    expect(createdPost).toBeTruthy();
    expect(createdPost.id).toBeTruthy();

    // check that an entry was created
    let posts = controller.getAll(default_user);
    expect(posts).toBeTruthy();
    expect(posts.length).toEqual(1);

    // test
    const result = controller.delete(createdPost.id, default_user);
    expect(result).toBeTruthy();
    expect(result).toEqual(createdPost);

    // check that no additional entry was created
    posts = controller.getAll(default_user);
    expect(posts).toBeTruthy();
    expect(posts.length).toEqual(0);
  });
});
