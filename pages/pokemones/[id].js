import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Pokemon = (props) => {
  const router = useRouter();
  console.log(router);
  /* 
  if (router.isFallback) {
    return <div>Cargando...</div>;
  } */
  return (
    <div>
      <h2>Nombre: {props.pokemon.name}</h2>
      <h3>Numero de pokedex: {props.pokemon.id}</h3>
      <Image
        src={props.pokemon.sprites.front_default}
        alt={props.pokemon.name}
        width={100}
        height={100}
      />
      <Link href={"/"}>Home</Link>
    </div>
  );
};

export default Pokemon;
//Ejemplo pagina dinamica generada desde el servidor
/* export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await res.json();
  return {
    props: {
      pokemon: data,
    },
  };
}; */

// Se pueden tener paginas estaticas y dinamicas, estaticas son las que se cargan mas rapido
// y dinamicas las que se cargan mas lento, esto se debe a que las dinamicas tienen que cargar
// datos de la api y las estaticas no

//fallback: false,
//Necesita que en getStaticPaths se le indiquen todas las paginas que se van a generar, esto es
//para que Next pueda generar el HTML y que se renderice el componente en el cliente, siempre y cuando
//no sean demasiadas paginas

//fallback: true,
//En este caso se tienen paginas estaticas dinamicas donde se establecen las rutas de las paginas estaticas
//donde la propiedad isFallback permite el renderizado de paginas que no se han cargado en los paths
//tambien esta propiedad se puede usar como un renderizado condicional de paginas que generarian el HTML
//al solicitar la pagina por primera vez pero este debe tener alguna pagina de carga por que si no, esta se rompe
//afortunadamente esto solo se da en la primera carga de la pagina
export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await res.json();
  return {
    props: {
      pokemon: data,
    },
  };
};

/* export const getStaticPaths = async () => {
  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];

  return {
    paths: paths,
    fallback: true,
  };
}; */

//fallback: 'blocking',
//Cuando fallback es blocking, el renderizado de la pagina se bloquea hasta que se carga la pagina
//por lo que no es necesario tener alguna pantalla de carga ya que este renderizado se bloquea pero
//por la misma situacion este tarda mas tiempo en renderizarse. y por UX es necesario agregar una pantalla
//de carga
export const getStaticPaths = async () => {
  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];

  return {
    paths: paths,
    fallback: "blocking",
  };
};
