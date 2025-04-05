import { useState, useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';

function App(){
  const [recipes, setRecipes] = useState([]);
  const[query, setQuery] = useState('pasta');
  const[error, setError] = useState(null);

  const API_KEY = 'bc38144eea5743798c6d78af7a8a43ef';

  useEffect(() => {
    const fetchRecipes = async () => {
      try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
        if(!response.ok) throw new Error('Recipes not found');
        const data = await response.json();

        

        setRecipes(data.results);
        setError(null);
      } catch(err){
        setError('No recipes found!');
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, [query, API_KEY]);

  const totalItems = recipes.length;


  return (
    <div className = "App">
      <Header />
      <div className = "dashboard">
        <SearchBar setQuery = {setQuery} />
        <div className="summary-stats">
          <p>Total Recipes: {totalItems}</p>
        </div>
        <div className = "recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <p>No recipes to display</p>
          )}
        </div>
      </div>
    </div>
  );
}


export default App;
