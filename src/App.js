import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import AllRecipes from "./AllRecipes";
import Recipe from "./Recipe";
import { MY_ID, MY_KEY } from "./config";
import Nav from "./Nav";
import Nutrition from "./Nutrition";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [nutritionSearch, setNutritionSearch] = useState([]);
  const [submittedSearch, setSubmittedSearch] = useState("avocado");
  const [searchType, setSearchType] = useState("recipe");
  const navigate = useNavigate();

  const handleNewSearch = (newSearch) => {
    setSubmittedSearch(newSearch);
    navigate("/");
    setSearch("");
  };

  const handleSelection = (e) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${submittedSearch}&app_id=${MY_ID}&app_key=${MY_KEY}`
      );
      const data = await res.json();
      console.log(data);
      setRecipes(data.hits);
    };
    getRecipes();
  }, [submittedSearch]);

  return (
    <div className="App">
      <Nav handleSelection={handleSelection} />

      <Search
        handleNewSearch={handleNewSearch}
        search={search}
        setSearch={setSearch}
        submittedSearch={submittedSearch}
        setSubmittedSearch={setSubmittedSearch}
        searchType={searchType}
        nutritionSearch={nutritionSearch}
        setNutritionSearch={setNutritionSearch}
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
