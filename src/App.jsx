import { ThemeProvider, createTheme } from "@mui/material"; // Importe les composants nécessaires pour les thèmes MUI
import { defaultTheme } from "./assets/defaultTheme"; // Importe le thème par défaut de l'application
import "./App.css"; // Importe les styles CSS de l'application
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importe les composants nécessaires pour la navigation
import { Navigate } from "react-router"; // Importe le composant Navigate pour la redirection

import UserCreation from "./components/UserCreation"; // Importe le composant UserCreation
import UserSelection from "./components/UserSelection"; // Importe le composant UserSelection
import UserPokedex from "./components/UserPokedex"; // Importe le composant UserPokedex
import Pokedex from "./components/Pokedex"; // Importe le composant Pokedex
import Pokemon from "./components/PokemonInfo"; // Importe le composant Pokemon

function App() {

  // Vérifie si des utilisateurs existent dans le stockage local
  const userExists = !!localStorage.getItem('users');

  // Définit la page initiale en fonction de l'existence d'utilisateurs
  const initialPage = userExists ? '/userSelection' : '/userCreation';
  
  // Crée un thème MUI
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}> {/* Fournit le thème MUI à l'application */}
      <BrowserRouter> {/* Encadre toutes les routes de l'application */}
        <Routes> {/* Contient toutes les routes de l'application */}
          <Route path="/userCreation" element={<UserCreation />} /> {/* Route vers la création d'utilisateur */}
          <Route path="/userSelection" element={<UserSelection />} /> {/* Route vers la sélection d'utilisateur */}
          <Route path="/userPokedex" element={<UserPokedex />} /> {/* Route vers le Pokédex de l'utilisateur */}
          <Route path="/pokedex" element={<Pokedex />} /> {/* Route vers le Pokédex */}
          <Route path="/pokemon/:id" element={<Pokemon />} /> {/* Route vers les détails d'un Pokémon */}
          <Route path="/" element={<Navigate to={initialPage} />} /> {/* Redirige vers la page initiale */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;