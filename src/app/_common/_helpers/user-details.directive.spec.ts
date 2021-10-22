import { UserDetailsDirective } from './user-details.directive';

describe('UserDetailsDirective', () => {
  it('should create an instance', () => {
    const directive = new UserDetailsDirective({} as any);
    expect(directive).toBeTruthy();
  });
});
