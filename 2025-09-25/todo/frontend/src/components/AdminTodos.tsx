import {
  Alert,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  Paper,
  Snackbar,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const API = "http://localhost:3000/admin";

export default function AdminTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({
    open: false,
    msg: "",
    severity: "success",
  });

  const fetchAll = async () => {
    const r = await fetch(`${API}/todos`, {
      headers: { "X-Admin-Token": "devadmin" },
    });
    const data = await r.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleDeleted = async (id: string) => {
    try {
      const r = await fetch(`${API}/todos/${id}/toggle-deleted`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": "devadmin",
        },
      });
      if (!r.ok) throw new Error();
      await fetchAll();
      setSnack({ open: true, msg: "Toggled deleted", severity: "success" });
    } catch {
      setSnack({ open: true, msg: "Toggle failed", severity: "error" });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Admin · Todos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Näita kõiki (ka kustutatud) ning toggelda <code>deleted</code>.
          </Typography>
        </Box>

        <List sx={{ width: "100%" }}>
          {todos.map((t) => (
            <ListItem key={t.id} divider sx={{ px: 0 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ width: "100%" }}
              >
                <Typography sx={{ flex: 1 }}>
                  {t.title}
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    id: {t.id}
                  </Typography>
                </Typography>

                <Chip
                  label={t.deleted ? "deleted:true" : "deleted:false"}
                  color={t.deleted ? "warning" : "success"}
                  variant="outlined"
                />

                <Tooltip
                  title={
                    t.deleted
                      ? "Restore (set deleted:false)"
                      : "Trash (set deleted:true)"
                  }
                >
                  <IconButton
                    color={t.deleted ? "success" : "error"}
                    onClick={() => toggleDeleted(t.id)}
                  >
                    {t.deleted ? (
                      <RestoreFromTrashIcon />
                    ) : (
                      <DeleteForeverIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </ListItem>
          ))}

          {todos.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 2 }}
            >
              Hetkel pole ühtegi todo’d.
            </Typography>
          )}
        </List>
      </Stack>

      <Snackbar
        open={snack.open}
        autoHideDuration={2200}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
