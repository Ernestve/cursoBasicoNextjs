//Para agregar imagenes externas en Next debemos agregar el dominio de la imagen
//en la configuracion de images de la siguiente manera:

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};
