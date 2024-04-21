import { useEffect, useState } from "react";
import Page from "./Page";
import { Box, Typography, FormGroup, FormControl, TextField, } from "@mui/material";
import axios from "axios";
import ListePokemon from "./Elements/ListePokemon";

function Pokedex() {
  // Définition des états utilisés dans le composant
  const [pokemonName, setPokemonName] = useState(""); // État pour stocker le nom du Pokémon recherché
  const [pokedex, setPokedex] = useState([]); // État pour stocker la liste complète des Pokémon
  const [searchPokedex, setSearchPokedex] = useState([]); // État pour stocker les Pokémon filtrés par recherche

  // Effet de chargement initial pour récupérer la liste des 150 premiers Pokémon depuis l'API
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        // Mapping des données pour formater chaque Pokémon avec son nom et son numéro
        const data = response.data.results.map((pokemon, index) => ({
          name: pokemon.name,
          number: index + 1,
        }));
        // Mise à jour des états pour la liste complète et la liste filtrée
        setPokedex(data);
        setSearchPokedex(data);
      })
      .catch((error) => {});
  }, []);

  return (
    <Page>
      {/* Section d'en-tête */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography variant="h1">Chercher un Pokemon</Typography>
      </Box>

      {/* Formulaire de recherche */}
      <FormGroup>
        <FormControl sx={{ marginBottom: 2 }}>
          <TextField
            label="Recherche ..."
            onChange={(e) => {
              // Mise à jour du nom du Pokémon recherché à chaque changement dans le champ de recherche
              setPokemonName(e.target.value);
              // Filtrage de la liste complète des Pokémon en fonction du nom recherché
              setSearchPokedex(
                pokedex.filter((pokemon) =>
                  pokemon.name.includes(e.target.value.toLowerCase())
                )
              );
            }}
            value={pokemonName}
          />
        </FormControl>
      </FormGroup>

      {/* Affichage du nombre de Pokémon trouvés */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography variant="h6">
          {searchPokedex.length + " Pokemon(s) trouvé(s)"}
        </Typography>
      </Box>

      {/* Affichage de la liste des Pokémon trouvés */}
      <ListePokemon pokemons={searchPokedex} />
    </Page>
  );
}

export default Pokedex;
