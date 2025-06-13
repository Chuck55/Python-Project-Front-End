import axios from "axios";

const backendPath = "http://127.0.0.1:5000/";

interface PokemonForm {
  pokemon_name: string;
  count: number;
  user_id: number;
}

export function get_all_pokemon_for_user() {
  return axios.get(backendPath + "get_all_pokemon_for_user", {
    params: {
      user_id: 1,
    },
  });
}

export function submit_pokemon_axios(form: PokemonForm) {
  return axios.post(backendPath + "save_pokemon_details", {
    pokemon_name: form.pokemon_name,
    user_id: form.user_id,
    count: form.count,
  });
}

export function remove_pokemon_axios(pokemon_name: string, user_id: number) {
  return axios.post(backendPath + "delete_pokemon", {
    pokemon_name: pokemon_name,
    user_id: user_id,
  });
}
