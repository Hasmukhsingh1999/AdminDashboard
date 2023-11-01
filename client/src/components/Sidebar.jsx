import { useTheme } from "@emotion/react";
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutline,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,

  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import profilePicture from "../assets/profile.avif";
import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { FlexBetween } from "./FlexBetween";

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutline /> },
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Perfomance", icon: <TrendingUpOutlined /> },
];

const Sidebar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  drawerWidth,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display={"flex"} alignItems={"center"} gap="0.5rem">
                  <Typography variant="h4" fontWeight={"bold"}>
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography sx={{ m: "2.25rem 0 1rem 3rem" }} key={text}>
                    {text}
                  </Typography>
                );
              }
              const lowerCaseText = text.toLowerCase();
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lowerCaseText}`);
                      setActive(lowerCaseText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lowerCaseText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lowerCaseText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lowerCaseText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lowerCaseText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                    {/* </ListItemText> */}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
          <Box mt={"1rem"} p={".5rem"}>
            <Divider />
            <Box
              // textTransform={"none"}
              // m="1.5rem 2rem 0 3rem"
              display={"flex"}
              justifyContent={"space-between"}
              // bgcolor={'green'}
              p={"1rem"}
            >
              <Box display={"flex"} gap="1rem">
                <Box
                  component={"img"}
                  alt="profile"
                  src={profilePicture}
                  width={"40px"}
                  height={"40px"}
                  borderRadius={"50%"}
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign={"left"}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
              </Box>
              {/* </Box> */}
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
