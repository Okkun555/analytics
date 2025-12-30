import styled from "@emotion/styled";
import { AppBar, Box, Typography, type Theme } from "@mui/material";
import theme from "~/libs/mui/theme";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router";

export const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const pages = [
    { title: "ダッシュボード", to: "/dashboard", icon: <SettingsIcon /> },
    { title: "設定", to: "/setting", icon: <SettingsIcon /> },
  ];

  return (
    <AppBar position="static" sx={{}}>
      <ContentBox theme={theme}>
        <Box>
          <Typography variant="h6" fontWeight="bold" component="div">
            Asset Management
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: theme.spacing(1),
          }}
        >
          {pages.map((page, index) => (
            <HeaderLink theme={theme} to={page.to} key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LinkText isSelect={pathName === page.to} theme={theme}>
                  {page.title}
                </LinkText>
              </Box>
            </HeaderLink>
          ))}
        </Box>
      </ContentBox>
    </AppBar>
  );
};

const ContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(2, 4),
}));

const HeaderLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.contrastText,
}));

const LinkText = styled(Typography)(
  ({ isSelect, theme }: { isSelect: boolean; theme: Theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
    fontWeight: isSelect ? "bold" : "normal",
    borderBottom: isSelect
      ? `1px solid ${theme.palette.primary.contrastText}`
      : "none",
  })
);
