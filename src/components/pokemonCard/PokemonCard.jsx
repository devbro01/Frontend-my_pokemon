import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  return (
    <>
      <div
        className="pokeCard card shadow text-center mt-5 mx-auto"
        style={{ width: "20rem" }}
      >
        <img className="card-img-top" src={pokemon.img} alt={pokemon.name} />
        <div className="card-body">
          <h5 className="card-title text-center text-uppercase">
            {pokemon.name}
          </h5>
          <p className="card-text text-center">
            <br />
            <strong className="text-warning">HP: </strong> {pokemon.hp} <br />
            <strong className="text-success">Attack: </strong> {pokemon.attack}<br />
            <strong className="text-primary">defense: </strong> {pokemon.defense} <br />
            <strong className="text-danger">Attack Type: </strong>{pokemon.types} <br />
            <strong className="text-info">Speed: </strong> {pokemon.speed}
          </p>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
