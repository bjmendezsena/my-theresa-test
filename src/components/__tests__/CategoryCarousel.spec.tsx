import { describe, it, expect } from '@/tests/utils';
import { getCategoriesMock, discoverMoviesMock } from '@/tests/mocks';
import { CategoryCarousel } from '@/components';
import { renderWithProviders, waitFor } from '@/tests/utils';

const mockCategory = getCategoriesMock[0];

describe(`<${CategoryCarousel.name}/>`, () => {
  const getComponent = () =>
    renderWithProviders(<CategoryCarousel category={mockCategory} />);

  it('Renders correctly', async () => {
    const { container } = getComponent();
    expect(container).matchSnapshot();
  });

  it('renders movies when data is available', async () => {
    const { getByText } = getComponent();
    await waitFor(() => {
      discoverMoviesMock.results.forEach(movie => {
        expect(getByText(movie.title)).toBeInTheDocument();
      });
    });
  });
});
