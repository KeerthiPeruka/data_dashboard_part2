import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

function RecipeCharts({ recipes }) {
  console.log('Recipes:', recipes); 

  const barChartData = recipes
    .filter((recipe) => recipe.readyInMinutes && recipe.title)
    .map((recipe) => ({
      name: recipe.title,
      time: recipe.readyInMinutes,
    }));

  const servingsCount = recipes.reduce((acc, recipe) => {
    const servings = recipe.servings;
    if (servings) {
      if (!acc[servings]) {
        acc[servings] = 1;
      } else {
        acc[servings]++;
      }
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(servingsCount).map(([servings, count]) => ({
    name: `${servings} Servings`,
    value: count,
  }));

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF4444"];

  //check if the data is being accessed and present
  if (barChartData.length === 0 || pieChartData.length === 0) {
    return <p>No valid data available for charts.</p>;
  }

  return (
    <div className="recipe-charts">
      <h2>Cooking Time for Different Recipes</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="purple" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Recipe Servings Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <PieTooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RecipeCharts;
