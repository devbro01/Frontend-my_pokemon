import React, { useState, useEffect } from "react";
import "./PokemonList.css";
import PokemonCard from "../pokemonCard/PokemonCard";
import { PropagateLoader } from "react-spinners";

const PokemonList = ({ liveData }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loader, setLoader] = useState(true);

  const limit = 100;

  useEffect(() => {
    setPokemonList([]);
    setOffset(0);
  }, [liveData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        const filteredResults = data.results.filter(
          (pokemon) => pokemon.name.includes(liveData.toLowerCase())
        );
        setPokemonList((prevList) => [
          ...prevList,
          ...filteredResults.filter(
            (pokemon) =>
              !prevList.some((prevPokemon) => prevPokemon.name === pokemon.name)
          ),
        ]); // Append filtered results to the list
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoader(false);
      }
    };

    fetchData();
  }, [offset, liveData]);

  const handleCardClick = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setSelectedPokemon({
        img: data.sprites.front_default,
        name: data.species.name,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        types: data.types[0].type.name,
        speed: data.stats[5].base_stat,
      });
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
    setSelectedPokemon(null);
  };

  return (
    <div className="container poke-card">
      {loader ? (
        <PropagateLoader className="mt-5" color="#ffcb05" />
      ) : (
        <>
          <div className="row mt-3">
            {selectedPokemon ? (
              <div className="col-md-3 mb-3">
                <PokemonCard pokemon={selectedPokemon} />
              </div>
            ) : (
              // list of pokemons
              pokemonList.map((pokemon, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div className="card flex-row align-items-center h-100" onClick={() => handleCardClick(pokemon.url)}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                        .split("/")
                        .slice(-2, -1)}.png`}
                      alt={pokemon.name}
                      className="card-img-top flex-grow-1"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                      </h5>
                    </div>
                  </div>
                </div>

              ))
            )}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success btn-load" onClick={handleLoadMore}>
              More Pokemons <i className="fa-solid fa-spinner fa-spin" />
            </button>
          </div>
        </>
      )
      }
    </div >
  );
};

export default PokemonList;
