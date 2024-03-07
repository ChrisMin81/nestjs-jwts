import { TestBed } from '@angular/core/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostApiService } from './post-api.service';

describe('PostApiService', () => {
  let service: PostApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
