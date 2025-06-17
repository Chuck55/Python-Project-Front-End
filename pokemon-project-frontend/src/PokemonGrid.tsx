import { useEffect, useState } from "react";
import { remove_pokemon_axios, submit_pokemon_axios } from "./axiosPokemon";
import type { PokemonForm, PokemonResponse, UserResponse } from "./interface";

interface Props {
  pokemonList: PokemonResponse[];
  userList: UserResponse[];
  error_message: string;
  setError: (error: string) => void;
  setClicked: (click: boolean) => void;
}

const PokemonGrid = ({
  pokemonList,
  userList,
  setError,
  setClicked,
}: Props) => {
  const initialForm: PokemonForm = { pokemon_name: "", count: 0, user_id: 0 };
  const [form, setForm] = useState(initialForm);
  const [usedPokemonList, setPokemonList] = useState(pokemonList);
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setPokemonList(pokemonList || []);
  }, [pokemonList]);

  const submitPokemon = () => {
    if (form.count > 0 && form.user_id > 0) {
      submit_pokemon_axios(form)
        .then(() => {
          setClicked(true);
          setForm(initialForm);
          setError("");
        })
        .catch((error) => {
          setError(error.response.data);
        });
    } else {
    }
  };

  const removePokemon = (pokemon_name: string, userId: number) => {
    remove_pokemon_axios(pokemon_name, userId)
      .then(() => {
        setClicked(true);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const changeTableValues = (event) => {
    const user_id = event.target.value;
    if (user_id == "") {
      setPokemonList(pokemonList);
    } else {
      const usePokemonList = pokemonList.filter(
        (pokemon) => pokemon.user_id == user_id
      );
      setPokemonList(usePokemonList);
    }
  };

  return (
    <>
      <div>
        <div>
          <p className="fs-2 fw-bold">Pokemon</p>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: "30%",
            display: "flex",
            gap: "8px",
          }}
        >
          <p className="fw-bold">Users:</p>
          <select
            name="user_id"
            onChange={changeTableValues}
            className="form-select"
          >
            <option value=""></option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Pokemon</th>
              <th>Count</th>
              <th>User Id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="pokemon_name"
                  value={form.pokemon_name}
                  onChange={handleFormChange}
                ></input>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="count"
                  value={form.count}
                  onChange={handleFormChange}
                ></input>
              </td>
              <td>
                <select
                  name="user_id"
                  value={form.user_id}
                  onChange={handleFormChange}
                >
                  <option value="0"></option>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={submitPokemon}
                  disabled={
                    form.count == 0 ||
                    form.pokemon_name == "" ||
                    form.user_id == 0
                  }
                >
                  Submit
                </button>
              </td>
            </tr>
            {usedPokemonList.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.pokemon_name}</td>
                <td>{pokemon.count}</td>
                <td>
                  {
                    userList.filter((user) => user.id == pokemon.user_id)[0]
                      .username
                  }
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removePokemon(pokemon.pokemon_name, pokemon.user_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PokemonGrid;
