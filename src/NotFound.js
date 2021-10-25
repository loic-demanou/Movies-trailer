import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="404">
            <h2>Oooooops......😅</h2>
            <p>Cette page n'existe pas</p>
            <Link to="/">Retourner a l'accueil</Link>
        </div>
     );
}
 
export default NotFound;