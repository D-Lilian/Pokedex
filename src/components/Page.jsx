import React from "react";
import { Box, Container, Card, Typography, Button } from "@mui/material";
import logo from "../assets/logo.png";
import { getUserInLocalStorage, setUserInLocalStorage } from "../services/user";
import { useState, useEffect } from "react";
import AvatarPicture from "./Elements/AvatarPicture";
import { useNavigate } from "react-router-dom";

function Page({ children }) {
  // État local pour stocker les informations sur l'utilisateur actuellement connecté
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  //  Récupérer les informations sur l'utilisateur dans le stockage local lors du chargement de la page
  useEffect(() => {
    const storedUser = getUserInLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleDisconnectUser = () => {
    // Efface / initialiser les informations de l'utilisateur du stockage local
    setUserInLocalStorage([]);
    // Redirige l'utilisateur vers la page de sélection de l'utilisateur
    navigate("/userSelection");
  };

  // Fonction pour gérer le clic sur le nom de l'utilisateur ou son avatar
  const handleUserClick = () => {
    // Redirige l'utilisateur vers la page du Pokédex de l'utilisateur
    navigate("/userPokedex");
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#F8F4F4", minHeight: "100vh" }}>
        <Container maxWidth="sm">
          <Box sx={{ paddingTop: 5, paddingBottom: 6 }}>
            <Box sx={{ marginBottom: 5, maxWidth: "300px", marginX: "auto" }}>
              {/* Logo Pokémon */}
              <img src={logo} alt="logo pokemon" />
            </Box>
            {/* Affichage de l'utilisateur connecté */}
            {user.length !== 0 && (
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                {/* Avatar et nom de l'utilisateur */}
                <Box
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={handleUserClick}
                  sx={{ cursor: "pointer", marginRight: "auto" }}
                >
                  <AvatarPicture image={user.avatar} />
                  <Typography variant="h5" sx={{ marginLeft: 2 }}>
                    Bonjour {user.username}
                  </Typography>
                </Box>
                {/* Bouton de déconnexion */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDisconnectUser}
                >
                  Se déconnecter
                </Button>
              </Box>
            )}
            {/* Contenu de la page */}
            <Card sx={{ padding: 2 }}>{children}</Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Page;
