import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Link,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState([0, 1, 2, 3]); // indices non lus
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllAsRead = () => {
    setUnreadNotifications([]);
  };

  const handleTelechargerClick = (e, index) => {
    e.stopPropagation();
    // Marquer cette notification comme lue
    setUnreadNotifications((prev) => prev.filter((i) => i !== index));
    navigate("/home/declaration");
    handleClose();
  };

  const notifications = [
    "Vous avez terminé le quizz. Télécharger votre attestation.",
    "Vous avez terminé votre adhésion. Télécharger votre fiche.",
    "Vous avez terminé votre adhésion. Télécharger votre fiche.",
    "Vous avez terminé votre adhésion. Télécharger votre fiche.",
  ];

  const formatNotification = (text, index) => {
    const parts = text.split("Télécharger");
    return (
      <>
        {parts[0]}
        <Link
          component="span"
          onClick={(e) => handleTelechargerClick(e, index)}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            color: "grey.700",
            fontWeight: "bold",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          Télécharger
        </Link>
        {parts[1]}
      </>
    );
  };

  return (
    <>
      <IconButton color="mustard yellow" onClick={handleClick}>
        <Badge badgeContent={unreadNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: { width: "500px", padding: "10px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Notifications
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={handleMarkAllAsRead}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "grey.500",
              fontWeight: "bold",
            }}
          >
            Tout lire
          </Link>
        </Box>
        <Divider />
        <Box
          sx={{
            maxHeight: "250px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          <List dense>
            {notifications.map((notif, index) => (
              <ListItem
                key={index}
                sx={{
                  alignItems: "flex-start",
                  bgcolor: unreadNotifications.includes(index)
                    ? "rgba(255, 236, 179, 0.3)"
                    : "transparent",
                  cursor: "pointer",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary">
                      {unreadNotifications.includes(index) && (
                        <Box component="span" sx={{ color: "#FF9800", mr: 1 }}>
                          🔸
                        </Box>
                      )}
                      {formatNotification(notif, index)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBell;
