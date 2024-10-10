import {  useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const types = ["Médicament", "Catégorie"];
function SearchBar() {

  const [autocompleteItems, setAutocompleteItems] = useState([])
    

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = async () => {
    await axios.get('http://localhost:8080/medicament/get', {})
      .then(function(response){
        console.log(response.data)
        setAutocompleteItems(response.data)
      })
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  const [query, setQuery] = useState({
    type: "Médicament",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const onInput= async (e)=>{
    if(e.target.value==""){
      let res = document.getElementById("result");
      res.innerHTML = '';
      return
    }
    axios.post('http://localhost:8080/medicament/search/'+e.target.value, {})
    .then(function (response) {
      var tab = []
      response.data.forEach(r => {
        tab.push(r.nom)
      });
      console.log(tab);
      // setAutocomplete(tab)

      let res = document.getElementById("result");
      res.innerHTML = '';
      let list = '';
      for (let i=0; i<tab.length; i++) {
        list += '<li>' + tab[i] + '</li>';
      }
      res.innerHTML = '<ul>' + list + '</ul>';

    })
  }

  return (
    <div className="searchBar">
      <div className="type">
        {/* {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))} */}
      </div>
      <ReactSearchAutocomplete
            items={autocompleteItems}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
      <form>
      {/* <input
          id="medicinput"
          type="text"
          name="maxPrice"
          placeholder={query.type === "Médicament" ? "Entrer le nom du médicament": "Entrer la catégorie"}
          onChange={handleChange}
          onInput={onInput}
          />
        <div id="result"></div> */}
        
    
        <Link  to={`/list?type=${query.type}`}>
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;