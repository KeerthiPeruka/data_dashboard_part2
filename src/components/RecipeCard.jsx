import React from 'react';

function RecipeCard({recipe}){
    const { title, image, readyInMinutes, servings, sourceUrl, minCalories} = recipe;
    
    return (
        <div className = "recipe-card">
            <img src = {image} alt={title}/>
            <h2> {title} </h2>
            </div>
    );
}

export default RecipeCard;