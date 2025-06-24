import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
        );
        if (!response.ok) throw new Error('Failed to fetch recipe details');
        const data = await response.json();
        setRecipe(data);
        setError(null);
      } catch (err) {
        setError('Could not load this recipe. It might be temporarily unavailable.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  const formatTime = (minutes) => {
    if (!minutes) return 'No time specified';
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading recipe details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <a href="#" onClick={() => navigate(-1)} className="back-button">
          ← Back to Recipes
        </a>
        <div className="error-container">
          <div className="error-icon">😔</div>
          <div className="error-text">{error}</div>
          <div className="error-subtitle">Please try another recipe or go back to browse more options.</div>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="container">
      <a href="#" onClick={() => navigate(-1)} className="back-button">
        ← Back to Recipes
      </a>
      
      <div className="recipe-details">
        <div className="recipe-details-header">
          <h1 className="recipe-details-title">{recipe.title}</h1>
          <div className="recipe-meta">
            <span>⏱️ Ready in {formatTime(recipe.readyInMinutes || 0)}</span>
            {recipe.servings && <span>👥 Serves {recipe.servings}</span>}
            {recipe.vegetarian && <span>🌱 Vegetarian</span>}
            {recipe.vegan && <span>🌿 Vegan</span>}
            {recipe.glutenFree && <span>🌾 Gluten-Free</span>}
            {recipe.dairyFree && <span>🥛 Dairy-Free</span>}
            {!recipe.vegetarian && !recipe.vegan && !recipe.glutenFree && !recipe.dairyFree && <span>🍽️ Classic Recipe</span>}
          </div>
        </div>

        <img 
          src={recipe.image || 'https://via.placeholder.com/600x400/667eea/ffffff?text=Delicious+Recipe'} 
          alt={recipe.title}
          className="recipe-details-image"
        />

        {recipe.summary && (
          <div className="recipe-section">
            <h2 className="recipe-section-title">About This Recipe</h2>
            <div 
              className="instructions-content"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        )}

        <div className="recipe-section">
          <h2 className="recipe-section-title">Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="ingredient-item">
                  {ingredient.original}
                </li>
              ))
            ) : (
              <li className="ingredient-item">No ingredients available for this recipe</li>
            )}
          </ul>
        </div>

        <div className="recipe-section">
          <h2 className="recipe-section-title">Instructions</h2>
          <div className="instructions-content">
            {recipe.instructions ? (
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            ) : recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step, index) => (
                  <li key={index}>
                    {step.step}
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ fontStyle: 'italic', textAlign: 'center', color: '#6D6D70' }}>
                Instructions are not available for this recipe. 
                You can use the ingredients list above to create your own version!
              </p>
            )}
          </div>
        </div>

        {recipe.sourceUrl && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a 
              href={recipe.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-btn"
            >
              View Original Recipe 🔗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;