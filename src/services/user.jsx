// Fonction pour récupérer l'utilisateur depuis le stockage local
export const getUserInLocalStorage = () => {
  // Récupérer l'utilisateur depuis le stockage local en utilisant la clé "user"
  const localStorageUser = localStorage.getItem("user");
  // Parser l'utilisateur depuis une chaîne JSON en objet JavaScript
  return JSON.parse(localStorageUser);
};

// Fonction pour définir l'utilisateur dans le stockage local
export const setUserInLocalStorage = (user) => {
  // Convertir l'utilisateur en chaîne JSON
  const userJSON = JSON.stringify(user);
  // Définir l'utilisateur dans le stockage local en utilisant la clé "user"
  localStorage.setItem("user", userJSON);
};
