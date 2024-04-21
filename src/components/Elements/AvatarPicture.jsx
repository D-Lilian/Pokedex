import Avatar from "@mui/material/Avatar"; // Importation du composant Avatar de Material-UI
import Avatar1 from "../../assets/1.jpg"; // Importation de l'image Avatar1 depuis le répertoire assets
import Avatar2 from "../../assets/2.jpg"; // Importation de l'image Avatar2 depuis le répertoire assets
import Avatar3 from "../../assets/3.jpg"; // Importation de l'image Avatar3 depuis le répertoire assets

function AvatarPicture(props) {
  // Définition du composant AvatarPicture avec les props passées en argument

  // Initialisation de la variable image avec l'image par défaut (Avatar1)
  let image = Avatar1;

  // Vérification de la valeur de la prop image et affectation de l'image correspondante à la variable image
  if (props.image === "1") {
    image = Avatar1; // Si la valeur de la prop image est "1", l'image Avatar1 est utilisée
  } else if (props.image === "2") {
    image = Avatar2; // Si la valeur de la prop image est "2", l'image Avatar2 est utilisée
  } else if (props.image === "3") {
    image = Avatar3; // Si la valeur de la prop image est "3", l'image Avatar3 est utilisée
  }

  // Retourne le composant Avatar avec la source de l'image déterminée précédemment
  return <Avatar sx={{ width: 50, height: 50 }} src={image} />;
}

export default AvatarPicture; // Exportation du composant AvatarPicture
