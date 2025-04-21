import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const { id, title, image } = recipe;

  return (
    <Link to={`/recipe/${id}`} className="recipe-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
    </Link>
  );
}

export default RecipeCard;
