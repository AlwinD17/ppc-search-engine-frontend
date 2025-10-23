import type { SearchResult } from '../types';

export const mockWebResults: SearchResult[] = [
    // --- Tecnología ---
    {
      id: '1',
      title: 'React - Una biblioteca de JavaScript para construir interfaces de usuario todo',
      url: 'https://reactjs.org',
      description: 'React te ayuda a crear interfaces de usuario a partir de piezas individuales llamadas componentes.',
      thumbnail: 'https://reactjs.org/logo-og.png',
      type: 'web',
      domain: 'reactjs.org',
      publishedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'TypeScript - JavaScript con sintaxis para tipos todo',
      url: 'https://www.typescriptlang.org',
      description: 'TypeScript es un lenguaje de programación desarrollado y mantenido por Microsoft.',
      thumbnail: 'https://www.typescriptlang.org/favicon-32x32.png',
      type: 'web',
      domain: 'typescriptlang.org',
      publishedDate: '2024-01-10'
    },
    {
      id: '3',
      title: 'Tailwind CSS - Un framework CSS utilitario todo',
      url: 'https://tailwindcss.com',
      description: 'Tailwind CSS es un framework de CSS utilitario que te permite construir diseños personalizados rápidamente.',
      thumbnail: 'https://tailwindcss.com/favicon-32x32.png',
      type: 'web',
      domain: 'tailwindcss.com',
      publishedDate: '2024-01-08'
    },
    {
      id: '4',
      title: 'Next.js - Framework React para producción todo',
      url: 'https://nextjs.org',
      description: 'Next.js proporciona renderizado del lado del servidor y generación estática para aplicaciones React.',
      thumbnail: 'https://nextjs.org/static/favicon/favicon-32x32.png',
      type: 'web',
      domain: 'nextjs.org',
      publishedDate: '2024-01-03'
    },
  
    // --- Música ---
    {
      id: '5',
      title: 'Imagine Dragons - Página oficial todo',
      url: 'https://www.imaginedragonsmusic.com',
      description: 'La banda estadounidense Imagine Dragons mezcla pop, rock y electrónica en sus producciones.',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Imagine_Dragons_logo.png',
      type: 'web',
      domain: 'imaginedragonsmusic.com',
      publishedDate: '2023-11-22'
    },
    {
      id: '6',
      title: 'Billie Eilish - Discografía y noticias todo',
      url: 'https://elcomercio.pe/resizer/v2/DEO2NHHHQFHATKGSBLPEB3IROM.jpg?auth=76ff3aab0d15533f4f20d2c8ecbeecc38374b3b66792cff26e179e443f93b384&width=2400&height=1620&quality=75&smart=true',
      description: 'Billie Eilish es una cantante y compositora estadounidense ganadora de múltiples premios Grammy.',
      thumbnail: 'https://elcomercio.pe/resizer/v2/DEO2NHHHQFHATKGSBLPEB3IROM.jpg?auth=76ff3aab0d15533f4f20d2c8ecbeecc38374b3b66792cff26e179e443f93b384&width=2400&height=1620&quality=75&smart=true',
      type: 'web',
      domain: 'billieeilish.com',
      publishedDate: '2023-10-15'
    },
    {
      id: '7',
      title: 'Spotify - Escucha millones de canciones todo',
      url: 'https://spotify.com',
      description: 'Spotify te permite escuchar tus artistas favoritos, crear playlists y descubrir nueva música.',
      thumbnail: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
      type: 'web',
      domain: 'spotify.com',
      publishedDate: '2023-09-01'
    },
  
    // --- Cine ---
    {
      id: '8',
      title: 'IMDb - Base de datos de películas y series todo',
      url: 'https://www.imdb.com',
      description: 'IMDb es la fuente más popular del mundo para películas, series y celebridades.',
      thumbnail: 'https://m.media-amazon.com/images/G/01/imdb/images/social/imdb_logo.png',
      type: 'web',
      domain: 'imdb.com',
      publishedDate: '2023-08-20'
    },
    {
      id: '9',
      title: 'Oppenheimer (2023) - Película dirigida por Christopher Nolan todo',
      url: 'https://www.universalpictures-latam.com/tl_files/content/movies/oppenheimer/oppenheimer_header-mobile.jpg',
      description: 'La historia de J. Robert Oppenheimer, el físico detrás de la bomba atómica.',
      thumbnail: 'https://www.universalpictures-latam.com/tl_files/content/movies/oppenheimer/oppenheimer_header-mobile.jpg',
      type: 'web',
      domain: 'universalpictures.com',
      publishedDate: '2023-07-21'
    },
  
    // --- Ciencia ---
    {
      id: '10',
      title: 'NASA - Administración Nacional de Aeronáutica y del Espacio todo',
      url: 'https://www.nasa.gov',
      description: 'Explora las últimas misiones espaciales, noticias científicas y descubrimientos astronómicos.',
      thumbnail: 'https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg',
      type: 'web',
      domain: 'nasa.gov',
      publishedDate: '2023-05-05'
    },
    {
      id: '11',
      title: 'CERN - Organización Europea para la Investigación Nuclear todo',
      url: 'https://home.cern',
      description: 'CERN es el laboratorio de física de partículas más grande del mundo, sede del Gran Colisionador de Hadrones.',
      thumbnail: 'https://home.cern/sites/home.web.cern.ch/files/2018-08/cern-logo.jpg',
      type: 'web',
      domain: 'cern.ch',
      publishedDate: '2023-04-19'
    },
  
    // --- Videojuegos ---
    {
      id: '12',
      title: 'The Legend of Zelda: Tears of the Kingdom todo',
      url: 'https://www.zelda.com/tears-of-the-kingdom/',
      description: 'La última entrega de la saga de Zelda ofrece un mundo abierto lleno de aventuras y secretos.',
      thumbnail: 'https://www.zelda.com/tears-of-the-kingdom/assets/images/tile.jpg',
      type: 'web',
      domain: 'zelda.com',
      publishedDate: '2023-03-10'
    },
    {
      id: '13',
      title: 'Steam - Tienda oficial de videojuegos',
      url: 'https://store.steampowered.com',
      description: 'Compra y juega miles de videojuegos en la plataforma más grande de distribución digital.',
      thumbnail: 'https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg',
      type: 'web',
      domain: 'steampowered.com',
      publishedDate: '2023-02-05'
    },
    {
      id: '14',
      title: 'Wuthering Waves - RPG de mundo abierto',
      url: 'https://wutheringwaves.kurogame.com',
      description: 'Un juego de rol de acción con exploración libre, combate dinámico y ambientación post-apocalíptica.',
      thumbnail: 'https://wutheringwaves.kurogame.com/images/favicon.ico',
      type: 'web',
      domain: 'kurogame.com',
      publishedDate: '2023-01-12'
    },
  
    // --- Cultura / Noticias ---
    {
      id: '15',
      title: 'BBC News - Noticias internacionales y análisis',
      url: 'https://www.bbc.com/news',
      description: 'Cobertura global de las últimas noticias, reportajes e investigaciones.',
      thumbnail: 'https://news.files.bbci.co.uk/include/newsspec/18054-assets/app-project-assets/bbc-blocks-dark.svg',
      type: 'web',
      domain: 'bbc.com',
      publishedDate: '2023-01-02'
    },
    {
      id: '16',
      title: 'National Geographic - Exploración y ciencia',
      url: 'https://www.nationalgeographic.com',
      description: 'Explora el planeta con reportajes de ciencia, naturaleza, historia y cultura.',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/National-Geographic-Logo.svg',
      type: 'web',
      domain: 'nationalgeographic.com',
      publishedDate: '2022-12-11'
    },
    {
      id: '17',
      title: 'Wikipedia - La enciclopedia libre',
      url: 'https://es.wikipedia.org',
      description: 'Wikipedia es una enciclopedia libre escrita de manera colaborativa por voluntarios de todo el mundo.',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
      type: 'web',
      domain: 'wikipedia.org',
      publishedDate: '2022-12-05'
    },
  
    // --- Educación ---
    {
      id: '18',
      title: 'Khan Academy - Aprende gratis',
      url: 'https://es.khanacademy.org',
      description: 'Recursos educativos gratuitos en matemáticas, programación, historia y más.',
      thumbnail: 'https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png',
      type: 'web',
      domain: 'khanacademy.org',
      publishedDate: '2022-11-17'
    },
    {
      id: '19',
      title: 'Coursera - Cursos online de universidades líderes',
      url: 'https://www.coursera.org',
      description: 'Aprende habilidades nuevas con cursos de Stanford, Google, IBM y más.',
      thumbnail: 'https://about.coursera.org/static/blueCourseraLogo-a244b5a3d5d90dfe90cf.svg',
      type: 'web',
      domain: 'coursera.org',
      publishedDate: '2022-11-10'
    },
    {
      id: '20',
      title: 'Udemy - Cursos en línea para aprender a tu ritmo',
      url: 'https://www.udemy.com',
      description: 'Plataforma de cursos en línea con temas de tecnología, arte, música y negocios.',
      thumbnail: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg',
      type: 'web',
      domain: 'udemy.com',
      publishedDate: '2022-10-02'
    }
  ];
  