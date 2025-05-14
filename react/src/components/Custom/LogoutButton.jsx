import React, { useState } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Ajoutez ici toute logique de déconnexion nécessaire
    navigate("http://localhost:5173/"); // Redirection vers la page de login
    handleClose();
  };

  return (
    <>
      <IconButton 
        onClick={handleClick}
        sx={{ 
          color: 'black', // Icône en noir
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <LogoutIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: { width: "300px", padding: "20px" },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Confirmation de déconnexion
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button 
              variant="outlined" 
              onClick={handleClose}
              sx={{ 
                mr: 1,
                color: '#FFDB58', // Couleur texte jaune moutarde
                borderColor: '#FFDB58', // Contour jaune moutarde
                '&:hover': {
                  borderColor: '#FFDB58.dark',
                  backgroundColor: 'rgba(255, 236, 179, 0.1)'
                }
              }}
            >
              Annuler
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{
                mr: 1,
                color: '#FFDB58', // Couleur texte jaune moutarde
                borderColor: '#FFDB58', // Contour jaune moutarde
                '&:hover': {
                  borderColor: '#FFDB58.dark',
                  
                }
              }}
            >
              Déconnexion
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default LogoutButton;