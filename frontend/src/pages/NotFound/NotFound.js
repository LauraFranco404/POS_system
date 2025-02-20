import './NotFound.css';
const Galleta = () => {
    return (
      <img src="/cookiesad.png" alt="Icono" className="imageNotFound"/>
    );
  }
const NotFound = () => {
  return (
    <div className="notFound">
        <h1>404 - Página no encontrada</h1>
        <div className="error">
            <h1 className="numeros">4</h1>
            <Galleta className ="imageNotFound"/>
            <h1 className="numeros">4</h1>

        </div>
    <p className="textoError">Lo sentimos, la página que estás buscando no existe.</p>
    <a className= "linkhome" href="/">Volver a la página de inicio</a>
    </div>
  );
};

export default NotFound;
