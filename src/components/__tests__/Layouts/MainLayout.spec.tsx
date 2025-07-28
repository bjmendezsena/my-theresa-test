import { renderWithProviders, expect, describe, test } from '@/tests/utils';
import { MainLayout } from '@/components';

describe(`<${MainLayout.name}/>`, () => {
  const getComponent = () =>
    renderWithProviders(<MainLayout>Test Content</MainLayout>);

  test('renders correctly', () => {
    const { container } = getComponent();
    expect(container).toMatchSnapshot();
  });

  test('renders children content', () => {
    const { getByText } = getComponent();
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
