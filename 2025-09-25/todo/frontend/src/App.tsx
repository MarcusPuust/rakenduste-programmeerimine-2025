import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import Todos from "./components/Todos";
import AdminTodos from "./components/AdminTodos";

export default function App() {
  const [view, setView] = useState<"todos" | "admin">("todos");

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
      <Box sx={{ width: "100%", maxWidth: 720 }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
          spacing={1}
        >
          <Button
            variant={view === "todos" ? "contained" : "outlined"}
            onClick={() => setView("todos")}
          >
            Todos
          </Button>
          <Button
            variant={view === "admin" ? "contained" : "outlined"}
            onClick={() => setView("admin")}
          >
            Admin
          </Button>
        </Stack>

        {view === "todos" ? <Todos /> : <AdminTodos />}
      </Box>
    </Box>
  );
}
