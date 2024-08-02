import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import AllRecipes from "./AllRecipes";
import Recipe from "./Recipe";
import { MY_ID, MY_KEY, MY_ID_NUTRITION, MY_KEY_NUTRITION } from "./config";
import Nav from "./Nav";
import Nutrition from "./Nutrition";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [nutritionSearch, setNutritionSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState("avocado");
  const [submittedNutriSearch, setSubmittedNutriSearch] = useState('');
  const [searchType, setSearchType] = useState("recipe");
  const navigate = useNavigate();

  const handleNewSearch = (newSearch) => {
    setSubmittedSearch(newSearch);
    navigate("/");
    setSearch("");
  };

  const handleNutritionSearch = (nutriSearch) => {
setSubmittedNutriSearch(nutriSearch);
setNutritionSearch('');
  }

  const handleSelection = (e) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${submittedSearch}&app_id=${MY_ID}&app_key=${MY_KEY}`
        );
        if (!res.ok) throw new Error(`Error! Status: ${res.status}`);
        const data = await res.json();
        setRecipes(data.hits);   
      } catch(err) {
console.log(err);
      }
    };
    getRecipes();
  }, [submittedSearch]);

  useEffect(() => {
    if (submittedNutriSearch) {
    const postNutrition = async () => {
      try {
        const body = {
          'ingr': submittedNutriSearch.split(','),
        };
  
        const res = await fetch(
          `https://api.edamam.com/api/nutrition-details?app_id=${MY_ID_NUTRITION}&app_key=${MY_KEY_NUTRITION}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
          }
        );
        if (!res.ok) throw new Error(`Error! Status: ${res.status}`)
  
        const data = await res.json();
        console.log(data);

      }catch(err) {
        console.log(err);
      }
      
    };

    postNutrition();
  }

   
  }, [submittedNutriSearch]);

  return (
    <div className="App">
      <Nav handleSelection={handleSelection} />

      <Search
        handleNewSearch={handleNewSearch}
        search={search}
        setSearch={setSearch}
        searchType={searchType}
        nutritionSearch={nutritionSearch}
        setNutritionSearch={setNutritionSearch}
        handleNutritionSearch={handleNutritionSearch}
      />
      <Routes>
        {searchType === "recipe" && (
          <>
            <Route path="/" element={<AllRecipes recipes={recipes} />} />
            <Route path="/recipe/:id" element={<Recipe />} />
          </>
        )}
        {searchType === "nutrition" && (
          <Route path="/" element={<Nutrition />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
