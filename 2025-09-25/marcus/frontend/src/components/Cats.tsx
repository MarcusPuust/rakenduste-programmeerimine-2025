import {
  Box,
  List,
  ListItem,
  Stack,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({ open: false, msg: "", severity: "success" });

  const fetchCats = async () => {
    const response = await fetch("http://localhost:3000/cats");
    const data = await response.json();
    setCats(data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const softDelete = async (id: string) => {
    try {
      const r = await fetch(`http://localhost:3000/cats/${id}/delete`, {
        method: "PATCH",
      });
      if (!r.ok) throw new Error();
      await fetchCats();
      setSnack({ open: true, msg: "Cat deleted", severity: "success" });
    } catch {
      setSnack({ open: true, msg: "Delete failed", severity: "error" });
    }
  };

  const updateCat = async (id: string, oldName: string) => {
    const newName = prompt("Enter new name", oldName);
    if (!newName) return;
    try {
      const r = await fetch(`http://localhost:3000/cats/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!r.ok) throw new Error();
      await fetchCats();
      setSnack({ open: true, msg: "Cat updated", severity: "success" });
    } catch {
      setSnack({ open: true, msg: "Update failed", severity: "error" });
    }
  };

  return (
    <Box
      /* App tasemel juba tsentreeritud; siin piisab tekstikeskusest */ sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Cats
      </Typography>

      <SubmitCat
        fetchCats={fetchCats}
        onSuccess={() =>
          setSnack({ open: true, msg: "Cat added", severity: "success" })
        }
        onError={() =>
          setSnack({ open: true, msg: "Add failed", severity: "error" })
        }
      />

      <List sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
        {cats.map((cat) => (
          <ListItem key={cat.id} divider>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography sx={{ flex: 1 }}>{cat.name}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => updateCat(cat.id, cat.name)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => softDelete(cat.id)}
              >
                Delete
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cats;
