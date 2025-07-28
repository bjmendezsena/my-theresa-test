import { Category } from '@/types';
import './GenreList.scss';

interface GenreListProps {
  genres: Category[];
  title?: string;
  className?: string;
}

export const GenreList = ({
  genres,
  title = 'Genres',
  className = '',
}: GenreListProps) => {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className={`genre-list ${className}`}>
      <h3 className="genre-list__title">{title}</h3>
      <div className="genre-list__tags">
        {genres.map(genre => (
          <span key={genre.id} className="genre-list__tag">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};
