import "./Content.css";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../pokemonCard/PokemonCard"
import PokemonList from "../pokemonList/PokemonList";
import { PropagateLoader } from "react-spinners";

function Content() {
  const [PokemonName, SetPokemonName] = useState("");
  const [pokemonChoosen, setPokemonChoosen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false)
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    types: "",
    speed: "",
  });

  // request
  const searchPokemon = () => {
    setLoading(true); // Set loading to true when request starts
    setError(false) // Set error message to false

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
      .then((response) => {
        console.log(response);
        setPokemon({
          name: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          defenese: response.data.stats[2].base_stat,
          attack: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          types: response.data.types[0].type.name,
        });
        setTimeout(() => {
          // default turn off loader after content loaded, extra 2 seconds for extra visualization
          setPokemonChoosen(true);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        // error
        setError(true)
        console.error(error);
        // disable loader on error
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };


  // close alert
  const handleClose = () => {
    setError(false)
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    SetPokemonName(value.toLocaleLowerCase());
  };

  return (
    <>
      <div className="header">
        {/* logo */}
        <a href="index.html">
          <img src={logo} className="logo" alt="logo" />
        </a>
        {/* search */}
        <div className="d-flex search-wrapper">
          <input
            type="text"
            placeholder="Enter pokemon name..."
            className="form form-control"
            value={PokemonName}
            onChange={handleInputChange}
          />
          <button onClick={searchPokemon} className="btn btn-warning">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
      </div>

      <div className="display">
        {Error && (
          <div className="alert alert-danger m-2 mt-4 fade show" role="alert">
            <div className="d-flex justify-content-between">
              <p className="my-auto">😥 Please enter pokmeon name correctly or check network status then try again!</p>
              {/* close */}
              <button onClick={handleClose} className="btn btn-transparent">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          </div>
        )}


        {loading ? (
          <div className="text-center">
            <PropagateLoader className="mt-5" color="#ffcb05" />
          </div>
        ) : !pokemonChoosen ? (
          <PokemonList liveData={PokemonName} />
        ) : (
          <div className="return">
            <PokemonCard pokemon={pokemon} />
            <button
              onClick={() => {
                setPokemonChoosen(false);
              }}
              className="btn btn-danger"
            >
              Return To Main Page
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
