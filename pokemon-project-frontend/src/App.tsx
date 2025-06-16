import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { get_all_pokemon_for_user, get_all_users } from "../src/axiosPokemon";
import PokemonGrid from "./pokemonGrid";
import type { PokemonResponse, UserResponse } from "./interface";
import UserGrid from "./UserGrid";
import Error from "./Error";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonResponse[]>([]);
  const [userList, setUserList] = useState<UserResponse[]>([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    get_all_users()
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });

    get_all_pokemon_for_user()
      .then((response) => {
        setPokemonList(response.data);
        setClicked(false);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [clicked]);

  return (
    <>
      <Error error={error}></Error>
      <UserGrid
        user_list={userList}
        setError={setError}
        setClicked={setClicked}
      ></UserGrid>
      <PokemonGrid
        pokemonList={pokemonList}
        userList={userList}
        error_message={error}
        setError={setError}
        setClicked={setClicked}
      ></PokemonGrid>
    </>
  );
}

export default App;
