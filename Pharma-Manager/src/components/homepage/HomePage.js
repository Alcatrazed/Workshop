import { useContext } from "react";
import "./homepage.scss";
import SearchBar from "../subComponents/searchBar/SearchBar";
//import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  //const {currentUser} = useContext(AuthContext);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Gérez vos stocks & digitalisez vos opérations pharmaceutiques</h1>
          <p>
            Optimisez la gestion de votre pharmacie grâce à une solution tout-en-un.
            "Pharma Manager" vous aide à suivre vos stocks en temps réel, à automatiser
            les tâches administratives, et à offrir un meilleur service à vos clients.
          </p>
          <SearchBar/>
          <div className="boxes">
            <div className="box">
              <h1>10+</h1>
              <h2>Années d'expérience</h2>
            </div>
            <div className="box">
              <h1>150+</h1>
              <h2>Pharmacies partenaires</h2>
            </div>
            <div className="box">
              <h1>10000+</h1>
              <h2>Transactions digitalisées</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/pg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;