import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const API_KEY = 'bc38144eea5743798c6d78af7a8a43ef';

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
      const data = await res.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Summary:</strong> <span dangerouslySetInnerHTML={{ __html: recipe.summary }} /></p>
      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
    </div>
  );
}

export default RecipeDetail;
