export interface PokemonResponse {
  pokemon_name: string;
  count: number;
  id: number;
  user_id: number;
}

export interface UserResponse {
    email: string;
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}

export interface PokemonForm {
  pokemon_name: string;
  count: number;
  user_id: number;
}


export interface UserForm {
    user_name: string;
    email: string;
    first_name: string;
    last_name: string;
}