import { useEffect, useState } from "react";
import Page from "./Page";
import AvatarPicture from "./Elements/AvatarPicture";
import { Box, Typography, FormGroup, FormControl, TextField, Button, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import { setUsersInLocalStorage, getUsersInLocalStorage, } from "../services/users";
import { Link } from "react-router-dom";
import { setUserPokedexInLocalStorage, } from "../services/userPokedex";

function UserCreation() {
  // State pour stocker le nom d'utilisateur, l'avatar et la liste des utilisateurs
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [users, setUsers] = useState([]);

  // Effet pour charger les utilisateurs depuis le stockage local au chargement de la page
  useEffect(() => {
    const storedUsers = getUsersInLocalStorage();
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // Effet pour sauvegarder les utilisateurs dans le stockage local à chaque changement dans la liste des utilisateurs
  useEffect(() => {
    if (users.length === 0) return;
    setUsersInLocalStorage(users);
    // Réinitialiser le Pokédex de l'utilisateur chaque fois qu'un nouvel utilisateur est ajouté
    setUserPokedexInLocalStorage(username, []);
  }, [users]);

  // Fonction pour ajouter un nouvel utilisateur à la liste
  const handleAddUser = () => {
    if (
      username === "" ||
      avatar === "" ||
      avatar === null ||
      username === null
    )
      return;
    // Vérifie si l'utilisateur existe déjà dans la liste
    if (users.find((user) => user.username === username) !== undefined) return;
    const user = {
      username: username,
      avatar: avatar,
    };
    // Ajoute le nouvel utilisateur à la liste
    setUsers([...users, user]);
  };

  // Fonction pour gérer le changement d'avatar sélectionné
  const handleAvatar = (event, newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <Page>
      {/* Interface utilisateur pour créer un nouvel utilisateur */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography variant="h1">Créer un utilisateur</Typography>
      </Box>

      {/* Interface utilisateur pour choisir un avatar */}
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="h4">Choisir un avatar</Typography>
      </Box>

      <Box sx={{ display: "flex", marginBottom: 2 }}>
        {/* ToggleButtonGroup pour sélectionner l'avatar */}
        <ToggleButtonGroup
          value={avatar}
          exclusive
          onChange={handleAvatar}
          aria-label="text alignment"
          sx={{ "& .MuiToggleButton-root": { outline: "none" } }}
        >
          {/* ToggleButtons pour différents avatars */}
          <ToggleButton value="1" aria-label="left aligned">
            <AvatarPicture image="1" />
          </ToggleButton>
          <ToggleButton value="2" aria-label="centered">
            <AvatarPicture image="2" />
          </ToggleButton>
          <ToggleButton value="3" aria-label="right aligned">
            <AvatarPicture value="3" image="3" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Formulaire pour saisir le nom d'utilisateur */}
      <FormGroup>
        <FormControl sx={{ marginBottom: 2 }}>
          <TextField
            label="Nom d'utilisateur"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </FormControl>

        {/* Bouton pour créer un compte utilisateur */}
        <FormControl sx={{ marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Créer un compte
          </Button>
        </FormControl>
      </FormGroup>

      {/* Bouton pour rediriger vers la page de sélection d'utilisateur */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Link to="/userSelection" style={{ width: "100%" }}>
          <Button variant="contained" color="primary" style={{ width: "100%" }}>
            Sélectionner un utilisateur
          </Button>
        </Link>
      </Box>
    </Page>
  );
}

export default UserCreation;
