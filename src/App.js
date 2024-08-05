import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import AllRecipes from "./AllRecipes";
import Recipe from "./Recipe";
import { MY_ID, MY_KEY, MY_ID_NUTRITION, MY_KEY_NUTRITION } from "./config";
import Nav from "./Nav";
import Nutrition from "./Nutrition";
import Swal from 'sweetalert2'
import Spinner from "./Spinner";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [nutritionData, setNutritionData] = useState({});
  const [search, setSearch] = useState("");
  const [nutritionSearch, setNutritionSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState("avocado");
  const [submittedNutriSearch, setSubmittedNutriSearch] = useState('');
  const [searchType, setSearchType] = useState("recipe");
  const [loader, setLoader] = useState(false);
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
    navigate(e.target.value === 'recipe' ? '/recipes' : '/nutritions');
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoader(true);
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${submittedSearch}&app_id=${MY_ID}&app_key=${MY_KEY}`
        );
        if (!res.ok) throw new Error(`Error! Status: ${res.status}`);
        const data = await res.json();
        setRecipes(data.hits); 
        setLoader(false);  
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

        console.log(body);
  
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
        if (!res.ok) {
          Swal.fire("Oops! It seems there is an issue with your input. Please use the format '1 avocado' (quantity and ingredient) for better results.");
          throw new Error(`Error! Status: ${res.status}`)
        }
  
        const data = await res.json();
        console.log(data, 'calories:', data.calories);
        setNutritionData(data);

      }catch(err) {
        console.log(err);
      }
      
    };

    postNutrition();
  }

   
  }, [submittedNutriSearch]);

  return (
    <div className="App">
    <header>
    <Link to={searchType === 'recipe' ? '/recipes' : '/nutritions'} className="home-btn">Home</Link>
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
      </header>

      {loader && <Spinner />}
      <Routes>
      
        {searchType === "recipe" && (
          <>
            <Route path="/recipes" element={<AllRecipes recipes={recipes} />} />
            <Route path="/recipe/:id" element={<Recipe />} />
          </>
        )}
        {searchType === "nutrition" && (
         
          <Route path="/nutritions" element={<Nutrition nutritionData={nutritionData} />} />
          
        )}
        <Route path="/" element={<Navigate to='/recipes' />} />
      </Routes>
    </div>
  );
}

export default App;
