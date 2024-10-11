import { useContext, useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import axios from "axios";
//import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext);


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      // "http://192.168.84.43:8080/login
      const res = await axios.post("http://localhost:8080/login", {
          username,
          password
      });
      if (res.data.success) {
          updateUser(res.data);  
          console.log(res);
          navigate("/");  
      } else {
          console.log(res.data.message);
          setError(res.data.message);
      }
  } catch (err) {
      console.error("Erreur serveur ou réseau", err);
      if (err.response) {
          setError(err.response.data.message || "Erreur inattendue");
      } else {
          setError("Erreur réseau. Veuillez vérifier votre connexion.");
      }
  } finally {
      setIsLoading(false);  
  }
  
  };

    const { currentUser } = useContext(AuthContext);  // Accéder à l'utilisateur authentifié

    // Si l'utilisateur est déjà authentifié, on le redirige vers le dashboard
    useEffect(() => {
      if (currentUser) {
        navigate('/dashboard');  // Redirection vers la page dashboard
      }
    }, [currentUser, navigate]);


  return (
  <div className="login">
    <div className="formContainer">
      <form onSubmit={handleSubmit} > 
        <h1>Bienvenue</h1>
        <input
          name="username"
          required
          minLength={3}
          maxLength={20}
          type="text"
          placeholder="Nom d'utilisateur"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Mot de passe"
        />
        <button disabled={isLoading}>Se connecter</button>
        {error && <span>{error}</span>}
        <Link to="/register"> Découvrez gratuitement le logiciel Pharma-Manager</Link>
      </form>
    </div>
    <div className="imgContainer">
      <img src="/pg.png" alt="" />
    </div>
  </div>
  )
}

export default Login