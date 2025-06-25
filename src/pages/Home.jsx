import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';


function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY;


  const fetchRecipes = useCallback(async (query = '', filterType = '') => {
    setIsInitialLoading(true);
    console.log('Fetching recipes with query:', query, 'filter:', filterType); 
    try {
      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12&addRecipeInformation=true&fillIngredients=true`;
      if (query) url += `&query=${encodeURIComponent(query)}`;
      if (filterType) {
        if (filterType === 'vegetarian') url += '&diet=vegetarian';
        if (filterType === 'vegan') url += '&diet=vegan';
        if (filterType === 'gluten-free') url += '&intolerances=gluten';
        if (filterType === 'dairy-free') url += '&diet=dairy-free';
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data.results || []); 
      setError(null);
    } catch (err) {
      setError('Unable to load recipes right now. Please check your connection and try again!');
      console.error('Fetch error:', err);
    } finally {
      setIsInitialLoading(false);
    }
  }, [API_KEY]);

 
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);


  const debouncedFetchRecipes = useRef(debounce((query, filterType) => {
    fetchRecipes(query, filterType);
  }, 500)).current;


  useEffect(() => {
    if (filter) {
      fetchRecipes(searchQuery, filter);
    }
  }, [filter, fetchRecipes, searchQuery]);

 
  useEffect(() => {
    if (searchQuery) {
      debouncedFetchRecipes(searchQuery, filter);
    } else if (!filter) {
      fetchRecipes('', filter);
    }
  }, [searchQuery, filter, debouncedFetchRecipes]);

  const formatTime = (minutes) => {
    if (!minutes || minutes === 0) return 'No time specified';
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <div className="error-icon">🍽️</div>
          <div className="error-text">{error}</div>
          <div className="error-subtitle">Don't worry, we'll get you cooking soon!</div>
          <button className="back-button" onClick={() => fetchRecipes(searchQuery, filter)}>
            Retry
          </button>
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

      <div className="search-filter-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder=" 🔍︎ Search by recipe name or ingredients..."
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Recipes</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="dairy-free">Dairy Free</option>
        </select>
      </div>

      {isInitialLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Discovering delicious recipes...</div>
        </div>
      )}

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
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;