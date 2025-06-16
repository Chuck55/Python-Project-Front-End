import axios from "axios";
import type { PokemonForm, UserForm } from "./interface";
const backendPath = "http://127.0.0.1:5000/";

export function get_all_pokemon_for_user() {
  return axios.get(backendPath + "get_all_pokemon_for_user");
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

export function get_all_users() {
  return axios.get(backendPath + "get_all_users");
}

export function submit_user(form: UserForm) {
  return axios.post(backendPath + "save_user_details", {
    username: form.user_name,
    email: form.email,
    first_name: form.first_name,
    last_name: form.last_name,
  });
}
