import Link from "next/link";

const Pokemon = (props) => {
  const id = props.pokemon.url.split("/")[6];
  return (
    <li>
      <h2>
        <Link href={`/pokemones/${id}`}>{props.pokemon.name}</Link>
      </h2>
    </li>
  );
};

export default function Pokemones(props) {
  return (
    <div>
      <p>Mi app de Pokemones</p>
      <ul>
        {props.pokemones.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
    </div>
  );
}
//La funcion getStaticProps se ejecuta cuando el componente es renderizado por primera vez ,
// y se ejecuta una sola vez, ya que le indica a Next que genere un HTML y este sea el que se renderiza
// por consiguiente este se carga mas rapido
export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  return {
    props: {
      pokemones: data.results,
    },
  };
};
