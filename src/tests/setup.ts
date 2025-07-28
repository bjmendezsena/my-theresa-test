import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach, vi } from '@/tests/utils';
import { queryClient } from '@/lib/react-query';
import { server } from './mocks/server';

const originalError = console.error;

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is deprecated') ||
        args[0].includes('Warning: React.createFactory is deprecated'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  server.close();
  console.error = originalError;
});
afterEach(() => server.resetHandlers());
afterEach(async () => {
  queryClient.clear();
});
