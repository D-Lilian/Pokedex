import { useEffect, useState } from "react";
import Page from "./Page";
import AvatarPicture from "./Elements/AvatarPicture";
import { Box, Typography, Button, Divider } from "@mui/material";
import { setUsersInLocalStorage, getUsersInLocalStorage, } from "../services/users";
import { setUserInLocalStorage } from "../services/user";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, Link } from "react-router-dom";

function UserCreation() {
  // État local pour stocker les utilisateurs
  const [users, setUsers] = useState([]);

  // Hook de navigation pour rediriger l'utilisateur
  const navigate = useNavigate();

  // Effet pour charger les utilisateurs depuis le stockage local lors du chargement de la page
  useEffect(() => {
    const storedUsers = getUsersInLocalStorage();
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // Effet pour sauvegarder les utilisateurs dans le stockage local chaque fois qu'ils sont mis à jour
  useEffect(() => {
    if (users.length === 0) return;
    setUsersInLocalStorage(users);
  }, [users]);

  // Fonction pour supprimer un utilisateur de la liste
  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    setUsersInLocalStorage(updatedUsers);
  };

  // Fonction pour sélectionner un utilisateur et le stocker dans le stockage local, puis rediriger vers le Pokédex de l'utilisateur
  const handleUserClick = (index) => {
    setUserInLocalStorage(users[index]);
    navigate("/userPokedex");
  };

  return (
    <Page>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography variant="h1">Connexion au Pokedex</Typography>
      </Box>
      {/* Affichage de la liste des utilisateurs avec possibilité de sélection et de suppression */}
      {users.map((user, index) => (
        <Box key={index} sx={{ marginBottom: 2, marginX: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Sélection de l'utilisateur */}
            <Box
              onClick={() => handleUserClick(index)}
              style={{ display: "flex" }}
            >
              <Box sx={{ marginBottom: 1, marginRight: 2 }}>
                <AvatarPicture image={user.avatar} />
              </Box>
              <Box sx={{ marginBottom: 1 }}>
                <Typography variant="h4">{user.username}</Typography>
              </Box>
            </Box>
            {/* Suppression de l'utilisateur */}
            <Box sx={{ marginLeft: "auto", marginBottom: 1 }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteUser(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}

      <Box sx={{ marginBottom: 2, marginX: 2 }}>
        <Divider />
      </Box>

      {/* Bouton pour créer un nouvel utilisateur */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Link to="/userCreation" style={{ width: "100%" }}>
          <Button variant="contained" color="primary" style={{ width: "100%" }}>
            Créer un utilisateur
          </Button>
        </Link>
      </Box>
    </Page>
  );
}

export default UserCreation;
