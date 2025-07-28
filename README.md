# My Theresa Test - Movie Discovery App

🔗 **Live Demo**:
[https://my-theresa-test.onrender.com](https://my-theresa-test.onrender.com)

A modern web application for discovering movies built with React, TypeScript,
Vite, and Server-Side Rendering (SSR). This application delivers **SSR benefits
without losing SPA functionality** thanks to TanStack Query's intelligent data
hydration strategy.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Docker (optional)

### Environment Setup

1. **Create environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Install dependencies:**

   ```bash
   npm i
   ```

### Running the Application

#### Development

```bash
npm run dev
```

Application will be available at `http://localhost:3000`

#### Production

```bash
# Build the application
npm run build

# Run in production
npm start
```

#### Docker

```bash
docker-compose up -d
```

#### Testing

```bash
# Run tests
npm test

# Tests in watch mode
npm run test:watch

# Coverage report
npm run coverage
```

## 🏗️ Architecture Overview

### SSR + SPA Hybrid Architecture

This application implements a **sophisticated SSR strategy** that maintains all
the benefits of Server-Side Rendering while preserving the smooth user
experience of a Single Page Application. The key innovation lies in our **data
hydration strategy** using TanStack Query.

#### Why SSR with SPA Functionality?

- **SEO Optimization**: Content is rendered server-side for search engine
  crawlers
- **Fast Initial Load**: Users see content immediately without waiting for
  JavaScript
- **Progressive Enhancement**: The app becomes interactive as JavaScript loads
- **Data Consistency**: No flash of loading states on initial page load
- **Smooth Navigation**: Subsequent navigation feels like a traditional SPA

### Data Hydration Strategy

#### Server-Side Data Prefetching

The server prefetches data for each route before rendering the HTML:

```typescript
// src/entry-server.tsx
export async function render(url: string) {
  const matches = matchRoutes(routes, url);
  const queryClient = getQueryClient();

  if (matches) {
    // Prefetch data for all matched routes
    await Promise.all(
      matches.map(async ({ route, params }) => {
        if (route.Component && route.Component.prefetch) {
          await route.Component.prefetch(queryClient, params);
        }
      })
    );
  }

  // Dehydrate the query client state
  const dehydratedState = dehydrate(queryClient);

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );

  return {
    appHtml,
    dehydratedState, // This contains all prefetched data
  };
}
```

#### Client-Side Hydration

The client receives the dehydrated state and hydrates the React Query cache:

```typescript
// src/entry-client.tsx
const container = document.getElementById('app');
const queryClient = getQueryClient();

const FullApp = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* HydrationBoundary rehydrates the cache with server data */}
      <HydrationBoundary state={window.__REACT_QUERY_STATE__ || {}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HydrationBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);

// Intelligent hydration: creates root in dev, hydrates in production
if (import.meta.hot || !container?.innerText) {
  const root = createRoot(container!);
  root.render(<FullApp />);
} else {
  hydrateRoot(container!, <FullApp />);
}
```

#### Server Implementation

The Express server handles both development and production SSR:

```typescript
// server.ts - SSR Handler
app.use('*', async (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl;

  try {
    let template = config.template;

    // Transform template in development
    if (!isProd && config.vite) {
      template = await config.vite.transformIndexHtml(url, template);
    }

    // Render the app with prefetched data
    const { appHtml, dehydratedState } = await config.render(url);

    // Inject the rendered HTML and dehydrated state
    const html = template
      .replace('<!--app-html-->', appHtml)
      .replace(
        '<!--dehydrated-state-->',
        `<script>window.__REACT_QUERY_STATE__=${JSON.stringify(dehydratedState || {})}</script>`
      );

    res.status(200).end(html);
  } catch (error) {
    // Error handling...
  }
});
```

#### Benefits of This Strategy

1. **No Flash of Loading States**: Data is available immediately on hydration
2. **Seamless Transitions**: Subsequent navigation uses cached data
3. **Optimal Performance**: Server renders with data, client continues
   seamlessly
4. **Error Resilience**: Graceful degradation if hydration fails
5. **Developer Experience**: Same components work for both SSR and client
   rendering

### Project Structure

```text
src/
├── components/          # Reusable UI components
├── features/           # Domain-specific modules
├── lib/               # Shared configurations and utilities
├── pages/             # Application pages
├── provider/          # Context providers
├── routes/            # Route configuration
├── styles/            # Global styles and variables
├── types/             # Global TypeScript types
├── entry-client.tsx   # Client-side entry point
└── entry-server.tsx   # Server-side entry point
```

### Feature-Based Modular Architecture

The application follows a **feature-based modular architecture** within the
`src/features/` directory. Each feature represents a specific business domain
and contains all related logic for that domain.

#### Why Features?

This architecture is based on these principles:

1. **Single Responsibility Principle (SRP)**: Each feature handles only its
   specific domain
2. **Open/Closed Principle (OCP)**: Features can be extended without modifying
   other parts
3. **High Cohesion, Low Coupling**: Elements within a feature are closely
   related
4. **Scalability**: Facilitates project growth and team collaboration
5. **Maintainability**: Easy to locate, modify, and test specific functionality

#### Feature Structure

```text
features/
├── categories/         # Movie categories management
│   ├── api/           # Use cases and API calls
│   ├── components/    # Category-specific components
│   ├── constants/     # Domain constants
│   └── types/         # TypeScript types
├── movies/            # Movie management
│   ├── api/           # Use cases and API calls
│   ├── components/    # Movie-specific components
│   ├── constants/     # Domain constants
│   └── types/         # TypeScript types
└── wishlist/          # Favorites list
    ├── components/    # Wishlist components
    ├── store/         # Global state with Zustand
    └── types/         # TypeScript types
```

#### Use Case Pattern

Each feature implements the **Use Case Pattern** in the `api/use-cases/` folder:

```typescript
// features/movies/api/use-cases/get-movie.ts
export const getMovie = (movieId: string) => {
  return apiClient.get<unknown, DetailedMovie>(`/movie/${movieId}`);
};

export const useGetMovie = (movieId: string) => {
  return useQuery(getMovieQueryOptions(movieId));
};
```

**Benefits:**

- **Business Logic Separation**: Use cases encapsulate specific operations
- **Reusability**: Use cases can be utilized across multiple components
- **Testing**: Facilitates unit testing by isolating logic
- **Maintainability**: Centralizes data-related operations

### Component Architecture

#### Global vs Feature-Specific Components

- **`src/components/`**: Reusable UI components (Header, Layout, ErrorBoundary)
- **`src/features/*/components/`**: Domain-specific components

#### BEM Architecture for SCSS

The application uses **BEM (Block Element Modifier)** methodology for CSS
organization:

```scss
/* Block */
.movie-card {
  /* Main block styles */
}

/* Element */
.movie-card__poster {
  /* Child element styles */
}

.movie-card__title {
  /* Child element styles */
}

/* Modifier */
.movie-card--featured {
  /* Block variation */
}

.movie-card__poster--loading {
  /* Element variation */
}
```

#### BEM Benefits

1. **Clarity**: Class names are self-descriptive
2. **Modularity**: Each component has encapsulated styles
3. **Maintainability**: Easy to locate and modify specific styles
4. **No Collisions**: Prevents naming conflicts between components
5. **Scalability**: Works well in large projects

### Technology Stack

#### Frontend

- **React 18**: Main framework with Server-Side Rendering
- **TypeScript**: Static typing for enhanced robustness
- **Vite**: Optimized build tool and dev server
- **React Router**: Navigation and routing
- **SCSS**: CSS preprocessor with BEM architecture

#### State and Data Management

- **TanStack Query**: Server state management and caching
- **Zustand**: Lightweight global state for wishlist
- **Axios**: Configured HTTP client

#### Testing Tools

- **Vitest**: Modern testing framework
- **Testing Library**: React component testing utilities

#### DevOps

- **Docker**: Application containerization
- **Express**: Server for SSR
- **ESLint + Prettier**: Code linting and formatting

### Design Patterns Implemented

1. **Provider Pattern**: For global contexts (React Query, Error Boundary)
2. **Custom Hooks**: For reusable logic and state
3. **Repository Pattern**: Data layer abstraction
4. **Observer Pattern**: For reactive state with Zustand
5. **Factory Pattern**: For query configuration

### Configuration

#### Environment Variables

- `VITE_API_URL`: TheMovieDB API base URL
- `VITE_API_KEY`: API authentication token

#### Available Scripts

- `npm run dev`: Development with hot reload
- `npm run build`: Production build
- `npm start`: Production server
- `npm test`: Run tests
- `npm run typecheck`: TypeScript type checking

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Maintain the existing modular architecture
4. Follow BEM conventions for CSS
5. Add tests for new functionality
6. Submit a Pull Request

## 📝 Additional Notes

- **SEO Optimized**: Server-Side Rendering for search engines
- **Performance**: Intelligent caching with TanStack Query
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: a11y considerations in all components
- **Type Safety**: Full TypeScript coverage
- **Modern Tooling**: Latest React 18 features and concurrent rendering
