import { TestBed } from '@angular/core/testing';

import { LogInInterceptor } from './log-in.interceptor';

describe('LogInInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogInInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogInInterceptor = TestBed.inject(LogInInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
