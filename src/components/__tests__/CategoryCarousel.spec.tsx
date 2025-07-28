import React from 'react';
import { describe, it, expect } from 'vitest';
import { getCategoriesMock, discoverMoviesMock } from '@/tests/mocks';
import { CategoryCarousel } from '@/components';
import { renderWithProviders, waitFor, getHtml } from '@/tests/utils';

const mockCategory = getCategoriesMock[0];

describe('CategoryCarousel', () => {
  const getComponent = () =>
    renderWithProviders(<CategoryCarousel category={mockCategory} />);

  //   it('Renders correctly', async () => {
  //     const { container } = getComponent();
  //     expect(container).matchSnapshot();
  //   });

  it('renders movies when data is available', async () => {
    const { getByText, container } = getComponent();
    await waitFor(() => {
      const html = getHtml(container);
      console.log({ html });
    });
  });
  //   it('renders empty state when no movies are available', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(emptyMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText('No movies found in this category.')
  //       ).toBeInTheDocument();
  //     });
  //     expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument();
  //   });
  //   it('renders navigation buttons', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     const leftButton = screen.getByLabelText('Scroll left');
  //     const rightButton = screen.getByLabelText('Scroll right');
  //     expect(leftButton).toBeInTheDocument();
  //     expect(rightButton).toBeInTheDocument();
  //   });
  //   it('disables left scroll button initially', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     const leftButton = screen.getByLabelText('Scroll left');
  //     expect(leftButton).toBeDisabled();
  //     expect(leftButton).toHaveClass('category-carousel__nav-btn--disabled');
  //   });
  //   it('handles scroll left button click', async () => {
  //     const mockScrollBy = vi.fn();
  //     // Mock the scrollBy method
  //     Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
  //       value: mockScrollBy,
  //       writable: true,
  //     });
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     // Mock that we can scroll left (simulate being in the middle of scrolling)
  //     const carousel = document.querySelector('.category-carousel__items');
  //     if (carousel) {
  //       Object.defineProperty(carousel, 'scrollLeft', {
  //         value: 300,
  //         writable: true,
  //       });
  //       // Trigger scroll event to update button states
  //       fireEvent.scroll(carousel);
  //     }
  //     const leftButton = screen.getByLabelText('Scroll left');
  //     fireEvent.click(leftButton);
  //     expect(mockScrollBy).toHaveBeenCalledWith({
  //       left: -300,
  //       behavior: 'smooth',
  //     });
  //   });
  //   it('handles scroll right button click', async () => {
  //     const mockScrollBy = vi.fn();
  //     // Mock the scrollBy method
  //     Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
  //       value: mockScrollBy,
  //       writable: true,
  //     });
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     const rightButton = screen.getByLabelText('Scroll right');
  //     fireEvent.click(rightButton);
  //     expect(mockScrollBy).toHaveBeenCalledWith({
  //       left: 300,
  //       behavior: 'smooth',
  //     });
  //   });
  //   it('updates scroll button states on scroll', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     const carousel = document.querySelector('.category-carousel__items');
  //     const leftButton = screen.getByLabelText('Scroll left');
  //     const rightButton = screen.getByLabelText('Scroll right');
  //     // Initially left button should be disabled
  //     expect(leftButton).toBeDisabled();
  //     if (carousel) {
  //       // Mock scroll properties to simulate being in the middle
  //       Object.defineProperty(carousel, 'scrollLeft', {
  //         value: 150,
  //         writable: true,
  //       });
  //       Object.defineProperty(carousel, 'scrollWidth', {
  //         value: 1000,
  //         writable: true,
  //       });
  //       Object.defineProperty(carousel, 'clientWidth', {
  //         value: 500,
  //         writable: true,
  //       });
  //       // Trigger scroll event
  //       fireEvent.scroll(carousel);
  //       // Both buttons should be enabled when in the middle
  //       await waitFor(() => {
  //         expect(leftButton).not.toBeDisabled();
  //         expect(rightButton).not.toBeDisabled();
  //       });
  //     }
  //   });
  //   it('displays correct movie information', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     // Check that movies are rendered with correct props
  //     const movieCards = document.querySelectorAll('.category-carousel__item');
  //     expect(movieCards).toHaveLength(3);
  //   });
  //   it('handles API error gracefully', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(
  //           { message: 'Internal Server Error' },
  //           { status: 500 }
  //         );
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     // Should still show the category title
  //     expect(screen.getByText('Action')).toBeInTheDocument();
  //     // Should eventually show empty state or handle error
  //     await waitFor(() => {
  //       expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument();
  //     });
  //   });
  //   it('updates scroll buttons on window resize', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     // Trigger window resize event
  //     fireEvent(window, new Event('resize'));
  //     // The component should handle the resize event (testing the event listener)
  //     // This tests that the event listener is properly attached
  //     expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
  //   });
  //   it('passes correct genre filter to useDiscoverMovies hook', async () => {
  //     const customCategory = {
  //       id: 99,
  //       name: 'Custom Genre',
  //     };
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, ({ request }) => {
  //         const url = new URL(request.url);
  //         const genres = url.searchParams.get('with_genres');
  //         // Verify that the correct genre ID is passed
  //         expect(genres).toBe('99');
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={customCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Custom Genre')).toBeInTheDocument();
  //     });
  //   });
  //   it('applies correct CSS classes to navigation buttons', async () => {
  //     server.use(
  //       http.get(`${env.API_URL}/discover/movie`, () => {
  //         return HttpResponse.json(mockMoviesResponse);
  //       })
  //     );
  //     renderWithProviders(<CategoryCarousel category={mockCategory} />);
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  //     });
  //     const leftButton = screen.getByLabelText('Scroll left');
  //     const rightButton = screen.getByLabelText('Scroll right');
  //     expect(leftButton).toHaveClass('category-carousel__nav-btn');
  //     expect(leftButton).toHaveClass('category-carousel__nav-btn--left');
  //     expect(leftButton).toHaveClass('category-carousel__nav-btn--disabled');
  //     expect(rightButton).toHaveClass('category-carousel__nav-btn');
  //     expect(rightButton).toHaveClass('category-carousel__nav-btn--right');
  //     expect(rightButton).not.toHaveClass('category-carousel__nav-btn--disabled');
  //   });
});
