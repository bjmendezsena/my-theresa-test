/**
 * Configuración específica del site basada en SITE_ID
 */

export interface SiteConfig {
  name: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  features: {
    wishlist: boolean;
    recommendations: boolean;
    socialSharing: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

const defaultConfig: SiteConfig = {
  name: 'Movie Discovery',
  theme: {
    primaryColor: '#333',
    secondaryColor: '#666',
    fontFamily: 'Arial, sans-serif',
  },
  features: {
    wishlist: true,
    recommendations: true,
    socialSharing: false,
  },
  api: {
    baseUrl: 'https://api.themoviedb.org/3',
    timeout: 5000,
  },
};

export const getSiteConfig = (): SiteConfig => {
  const siteId = process.env.SITE_ID;

  switch (siteId) {
    case 'mytheresa':
      return {
        ...defaultConfig,
        name: 'MyTheresa Movies',
        theme: {
          primaryColor: '#000',
          secondaryColor: '#666',
          fontFamily: 'Helvetica, Arial, sans-serif',
        },
        features: {
          ...defaultConfig.features,
          socialSharing: true,
        },
      };

    case 'yoox':
      return {
        ...defaultConfig,
        name: 'YOOX Cinema',
        theme: {
          primaryColor: '#e74c3c',
          secondaryColor: '#c0392b',
          fontFamily: 'Georgia, serif',
        },
        features: {
          ...defaultConfig.features,
          recommendations: false,
        },
      };

    default:
      return defaultConfig;
  }
};
