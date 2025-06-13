import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  get_all_pokemon_for_user,
  remove_pokemon_axios,
  submit_pokemon_axios,
} from "../src/axiosPokemon";

interface PokemonResponse {
  pokemon_name: string;
  count: number;
  id: number;
  user_id: number;
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonResponse[]>([]);
  const [clicked, setClicked] = useState(false);
  const [form, setForm] = useState({ pokemon_name: "", count: 0, user_id: 0 });
  const [error, setError] = useState("");
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
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

  const submitPokemon = () => {
    if (form.count > 0 && form.user_id > 0) {
      submit_pokemon_axios(form)
        .then(() => {
          setClicked(true);
          setForm({ pokemon_name: "", count: 0, user_id: 0 });
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

  return (
    <>
      <div>
        {error != "" && <p style={{ color: "red" }}>{error}</p>}
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
                name="count"
                value={form.count}
                onChange={handleFormChange}
              ></input>
            </td>
            <td>
              <input
                type="number"
                name="user_id"
                value={form.user_id}
                onChange={handleFormChange}
              ></input>
            </td>
            <td>
              <button className="btn btn-primary" onClick={submitPokemon}>
                Submit
              </button>
            </td>
            {pokemonList.map((pokemon) => (
              <tr>
                <td>{pokemon.pokemon_name}</td>
                <td>{pokemon.count}</td>
                <td>{pokemon.user_id}</td>
                <td>
                  <button
                    className="btn btn-primary"
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
}

export default App;
