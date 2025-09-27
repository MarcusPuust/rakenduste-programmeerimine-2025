import { Box } from "@mui/material";
import Todos from "./components/Todos";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 560 }}>
        <Todos />
      </Box>
    </Box>
  );
}
