import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12&addRecipeInformation=true&fillIngredients=true`
        );
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data.results);
        setError(null);
      } catch (err) {
        setError('Unable to load recipes right now. Please check your connection and try again!');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const formatTime = (minutes) => {
    if (!minutes) return 'Quick';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Discovering delicious recipes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <div className="error-icon">🍽️</div>
          <div className="error-text">{error}</div>
          <div className="error-subtitle">Don't worry, we'll get you cooking soon!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Discover Amazing Recipes</h1>
      <p className="page-subtitle">
        From quick weeknight dinners to impressive weekend treats - find your next favorite dish
      </p>
      
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-box">
            <img
              src={recipe.image || 'https://via.placeholder.com/320x200/667eea/ffffff?text=Delicious+Recipe'}
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-box-content">
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-desc">
                {recipe.summary 
                  ? recipe.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                  : 'Click to discover this amazing recipe and learn how to make it step by step!'
                }
              </p>
              <div className="recipe-card-footer">
                <div className="recipe-meta">
                  <span>⏱️ {formatTime(recipe.readyInMinutes)}</span>
                  {recipe.servings && <span>👥 {recipe.servings} servings</span>}
                </div>
                <div className="recipe-meta">
                  {recipe.vegetarian && <span>🌱</span>}
                  {recipe.vegan && <span>🌿</span>}
                  {recipe.glutenFree && <span>🌾</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;