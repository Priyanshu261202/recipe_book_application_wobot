import { createContext, useContext, useState } from 'react';

const RecipeContext = createContext({ recipe: null, setRecipe: () => {}, error: null });

export function RecipeProvider({ children }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  return (
    <RecipeContext.Provider value={{ recipe, setRecipe, error, setError }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipeContext = () => useContext(RecipeContext);