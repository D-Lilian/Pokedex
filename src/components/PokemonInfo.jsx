import { useEffect, useState } from "react";
import Page from "./Page";
import { Box, Typography, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { getUserPokedexInLocalStorage, setUserPokedexInLocalStorage, } from "../services/userPokedex";
import { getUserInLocalStorage } from "../services/user";

function PokemonInfo() {
  const id = useParams();

  const [userPokedex, setUserPokedex] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);

  const [username, setUsername] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Ajouter dans le Pokédex");

  useEffect(() => {
    const storedPokedex = getUserPokedexInLocalStorage(username);
    if (storedPokedex) {
      setUserPokedex(storedPokedex);
      const isPokemonInPokedex = storedPokedex.some(
        (pokemon) => pokemon.number === id.id
      );
      setButtonLabel(
        isPokemonInPokedex ? "Supprimer du Pokédex" : "Ajouter dans le Pokédex"
      );
    }
  }, [username]);

  useEffect(() => {
    const storedUser = getUserInLocalStorage(username);
    if (storedUser) {
      setUsername(storedUser.username);
    }

    const storedPokedex = getUserPokedexInLocalStorage(username);
    if (storedPokedex == null) {
      setUserPokedex(storedPokedex);
    }
  }, []);

  const handleAddOrDeletePokemon = () => {
    const storedPokedex = getUserPokedexInLocalStorage(username);
    let updatedPokedex;

    if (storedPokedex) {
      updatedPokedex = [...storedPokedex];
      const pokemonIndex = updatedPokedex.findIndex(
        (pokemon) => pokemon.number === id.id
      );

      if (pokemonIndex !== -1) {
        // Si le Pokémon est déjà dans le Pokédex, supprimez-le
        updatedPokedex.splice(pokemonIndex, 1);
        setButtonLabel("Ajouter dans le Pokédex");
      } else {
        // Sinon, ajoutez-le au Pokédex
        const info = {
          number: id.id,
          name: pokemonName,
        };
        updatedPokedex.push(info);
        setButtonLabel("Supprimer du Pokédex");
      }
    } else {
      updatedPokedex = [id.id];
      setButtonLabel("Supprimer du Pokédex");
    }

    setUserPokedex(updatedPokedex);
    setUserPokedexInLocalStorage(username, updatedPokedex);
  };

  const handleReturn = () => {
    window.history.back();
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + id.id + "/")
      .then((response) => {
        const data = response.data;
        setTypes(data.types);
        setPokemonName(data.name);
        setStats(data.stats);
      })
      .catch((error) => {});
  }, []);

  // Met à jour le stockage local lorsque userPokedex change
  useEffect(() => {
    setUserPokedexInLocalStorage(username, userPokedex);
  }, [userPokedex]);

  return (
    <Page>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" align="left">
          {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}{" "}
        </Typography>
        <Typography variant="h5" sx={{ marginLeft: "auto" }}>
          {"#" + id.id}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "left", marginBottom: 2 }}>
        <Stack direction="row" spacing={1}>
          {types.map((type, index) => (
            <Chip
              key={index}
              label={
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
              }
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Avatar
          sx={{ width: 400, height: 400 }}
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            id.id +
            ".png"
          }
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" align="left">
          {" "}
          Statistiques{" "}
        </Typography>
      </Box>

      <Box sx={{ justifyContent: "center", marginBottom: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid key={index} item xs={4}>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={stat.base_stat}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {`${stat.base_stat}`}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" align="center">
                  {stat.stat.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handleAddOrDeletePokemon}
        >
          {buttonLabel}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handleReturn}
        >
          Retour au pokedex
        </Button>
      </Box>
    </Page>
  );
}

export default PokemonInfo;
