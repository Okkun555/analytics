import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import theme from "~/libs/mui/theme";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          aria-label="menu"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" component="div">
          AssetM
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
