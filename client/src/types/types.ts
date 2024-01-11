export interface MovieType {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export interface ModalState {
  isOpen: boolean;
}

export interface MovieListState {
  movies: MovieType[];
  selectedMovie: MovieType | null;
}

export interface SearchState {
  value: string;
}