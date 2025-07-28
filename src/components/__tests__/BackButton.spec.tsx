import {
  renderWithProviders,
  expect,
  describe,
  test,
  act,
} from '@/tests/utils';
import { BackButton } from '@/components';

describe(`<${BackButton.name}/>`, () => {
  const getComponent = () =>
    renderWithProviders(<BackButton to="/">Go back</BackButton>);

  test('renders correctly', () => {
    const { container } = getComponent();
    expect(container).toMatchSnapshot();
  });

  test('calls history.back on click', () => {
    const { getByRole } = getComponent();
    const backButton = getByRole('button');

    act(() => {
      backButton.click();
    });

    expect(window.history.length).toBe(1);
  });
});
