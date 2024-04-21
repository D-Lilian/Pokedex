// Cette fonction récupère le Pokédex de l'utilisateur dans le stockage local en fonction de son nom d'utilisateur.
export const getUserPokedexInLocalStorage = (username) => {
  // Récupère les données du stockage local correspondant à l'utilisateur spécifié.
  const localStorageUserPokedex = localStorage.getItem(username);
  // Parse les données JSON pour les convertir en objet JavaScript.
  return JSON.parse(localStorageUserPokedex);
};

// Cette fonction enregistre le Pokédex de l'utilisateur dans le stockage local en fonction de son nom d'utilisateur.
export const setUserPokedexInLocalStorage = (username, userPokedex) => {
  // Convertit l'objet JavaScript représentant le Pokédex de l'utilisateur en chaîne JSON.
  const userPokedexJSON = JSON.stringify(userPokedex);
  // Enregistre la chaîne JSON dans le stockage local avec la clé correspondant au nom d'utilisateur.
  localStorage.setItem(username, userPokedexJSON);
};
