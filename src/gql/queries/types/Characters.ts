
export interface Characters_chacters_info {
  __typename: "Info";
  count: number | null;
  pages: number | null;
  next: number | null;
}

export interface Characters_chacters_location {
  __typename: "Location";
  name: string | null;
}

export interface Characters_chacters_results {
  __typename: "Character";
  id: string | null;
  name: string | null;
  species: string | null;
  location: Characters_chacters_location | null;
  image: string | null;
}

export interface Characters_characters {
  __typename: "Characters";
  info: Characters_chacters_info | null;
  results: (Characters_chacters_results | null) [] | null;
}

export interface Characters {
  chacters: Characters_characters | null;
}

export interface CharactersVariables {
  page?: number | null;
}

