// Import de la bibliothèque axios pour effectuer des requêtes HTTP
import axios from "axios";

// Fonction pour obtenir les données d'un Pokémon par son identifiant
export const getPokemonById = (id) => {
  // Effectue une requête GET à l'API PokeAPI pour obtenir les données du Pokémon
  axios
    .get("https://pokeapi.co/api/v2/pokemon/" + id + "/")
    // Une fois la réponse reçue, exécute cette fonction
    .then((response) => {
      // Extrait les données du corps de la réponse
      const data = response.data.results;
      // Retourne les données extraites
      return data;
    })
    // En cas d'erreur lors de la requête, exécute cette fonction
    .catch((error) => {
      // Gère l'erreur de manière appropriée (dans ce cas, ne fait rien)
    });
};
