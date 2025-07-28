import { renderWithProviders, expect, describe, test } from '@/tests/utils';
import { ErrorFallback } from '@/components';

describe(`<${ErrorFallback.name}/>`, () => {
  const getComponent = () => renderWithProviders(<ErrorFallback />);

  test('renders correctly', () => {
    const { container } = getComponent();
    expect(container).toMatchSnapshot();
  });
});
