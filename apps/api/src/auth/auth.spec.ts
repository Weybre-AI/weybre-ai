import { auth } from './auth';

describe('Better Auth Configuration', () => {
  it('should have emailAndPassword enabled', () => {
    expect(auth.options.emailAndPassword?.enabled).toBe(true);
  });
});
