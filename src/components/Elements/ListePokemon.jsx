import React from "react";
import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard"; // Importation du composant PokemonCard

function ListePokemon({ pokemons }) {
  // Définition du composant ListePokemon qui prend une prop "pokemons"
  return (
    <Grid container spacing={2}>
      {" "}
      {/* Utilisation du composant Grid de Material-UI pour créer une grille avec un espace de 2 entre les éléments */}
      {pokemons.map(
        (
          pokemon,
          index // Mapping sur la liste des pokemons pour afficher chaque PokemonCard
        ) => (
          <Grid key={index} item xs={6}>
            {" "}
            {/* Utilisation du composant Grid pour définir chaque élément de la grille, avec une largeur de 6 colonnes pour les écrans de taille "xs" */}
            <PokemonCard pokemon={pokemon} />{" "}
            {/* Affichage du composant PokemonCard pour chaque Pokemon, en passant le Pokemon en tant que prop */}
          </Grid>
        )
      )}
    </Grid>
  );
}

export default ListePokemon; // Exportation du composant ListePokemon
