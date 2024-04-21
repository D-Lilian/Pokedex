import React from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

// Composant PokemonCard prenant un objet pokemon en tant que prop
function PokemonCard({ pokemon }) {
  // Utilisation de useNavigate pour la navigation
  const navigate = useNavigate();

  // Fonction pour gérer le clic sur le bouton "Voir le pokemon"
  const handlePokemonView = () => {
    // Redirige l'utilisateur vers la page du Pokémon sélectionné en utilisant son numéro
    navigate("/pokemon/" + pokemon.number + "/");
  };

  // Rendu du composant PokemonCard
  return (
    <Card>
      {/* Affichage de l'avatar du Pokémon */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={
            // URL de l'image officielle du Pokémon à partir de l'API Pokémon
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            pokemon.number +
            ".png"
          }
        />
      </Box>
      <CardContent>
        {/* Affichage du nom du Pokémon */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography gutterBottom variant="h6">
            {pokemon.name}
          </Typography>
        </Box>
        {/* Bouton pour voir les détails du Pokémon */}
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handlePokemonView}
        >
          Voir le pokemon
        </Button>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
