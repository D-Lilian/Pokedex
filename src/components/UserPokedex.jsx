import { useEffect, useState } from "react";
import Page from "./Page";
import { Box, Typography, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { getUserPokedexInLocalStorage } from "../services/userPokedex"; // Importe la fonction pour obtenir le Pokédex de l'utilisateur
import { getUserInLocalStorage } from "../services/user"; // Importe la fonction pour obtenir l'utilisateur
import ListePokemon from "./Elements/ListePokemon"; // Importe le composant pour afficher la liste des Pokémon

function UserPokedex() {
  // Déclaration des états pour stocker l'utilisateur et son Pokédex
  const [user, setUser] = useState([]);
  const [userPokedex, setUserPokedex] = useState([]);

  // Effet qui s'exécute au chargement de la page pour obtenir l'utilisateur
  useEffect(() => {
    const storedUser = getUserInLocalStorage(); // Obtient l'utilisateur du stockage local
    if (storedUser) {
      setUser(storedUser); // Met à jour l'état de l'utilisateur
    }
  }, []);

  // Effet qui s'exécute lorsque l'utilisateur change pour obtenir son Pokédex
  useEffect(() => {
    const storedPokedex = getUserPokedexInLocalStorage(user.username); // Obtient le Pokédex de l'utilisateur du stockage local
    if (storedPokedex) {
      setUserPokedex(storedPokedex); // Met à jour l'état du Pokédex de l'utilisateur
    }
  }, [user]);

  // Rendu de l'interface utilisateur
  return (
    <Page>
      {/* Titre de la page */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography variant="h1">Pokedex</Typography>
      </Box>

      {/* Affiche un message si le Pokédex de l'utilisateur est vide */}
      {userPokedex.length === 0 && (
        <Box sx={{ marginBottom: 2, marginRight: 2 }}>
          <Typography variant="h7">Votre Pokedex est vide</Typography>
        </Box>
      )}

      {/* Affiche la liste des Pokémon du Pokédex de l'utilisateur */}
      <ListePokemon pokemons={userPokedex} />

      {/* Séparateur */}
      <Box sx={{ marginBottom: 2, marginX: 2 }}>
        <Divider />
      </Box>

      {/* Bouton pour rechercher un Pokémon */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Link to="/Pokedex" style={{ width: "100%" }}>
          <Button variant="contained" color="primary" style={{ width: "100%" }}>
            Chercher un Pokemon
          </Button>
        </Link>
      </Box>
    </Page>
  );
}

export default UserPokedex;
