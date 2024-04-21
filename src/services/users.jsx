// Fonction pour récupérer les utilisateurs stockés dans le stockage local
export const getUsersInLocalStorage = () => {
  // Récupère les données des utilisateurs dans le stockage local
  const localStorageUsers = localStorage.getItem("users");
  // Convertit les données JSON en objet JavaScript et les renvoie
  return JSON.parse(localStorageUsers);
};

// Fonction pour stocker les utilisateurs dans le stockage local
export const setUsersInLocalStorage = (users) => {
  // Convertit l'objet JavaScript en chaîne JSON
  const usersJSON = JSON.stringify(users);
  // Stocke la chaîne JSON dans le stockage local sous la clé 'users'
  localStorage.setItem("users", usersJSON);
};
