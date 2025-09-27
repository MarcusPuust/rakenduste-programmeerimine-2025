import { Box } from "@mui/material";
import Todos from "./components/Todos";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
        <Todos />
      </Box>
    </Box>
  );
}
