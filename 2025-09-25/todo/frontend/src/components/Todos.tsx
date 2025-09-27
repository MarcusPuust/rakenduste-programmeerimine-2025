import {
  Box,
  List,
  ListItem,
  Stack,
  Typography,
  Button,
  Snackbar,
  Alert,
  Checkbox,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({ open: false, msg: "", severity: "success" });

  const api = "http://localhost:3000/todos";

  const fetchTodos = async () => {
    const r = await fetch(api);
    const data = await r.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const softDelete = async (id: string) => {
    try {
      const r = await fetch(`${api}/${id}/delete`, { method: "PATCH" });
      if (!r.ok) throw new Error();
      await fetchTodos();
      setSnack({ open: true, msg: "Todo deleted", severity: "success" });
    } catch {
      setSnack({ open: true, msg: "Delete failed", severity: "error" });
    }
  };

  const updateTitle = async (id: string, oldTitle: string) => {
    const title = prompt("Enter new title", oldTitle);
    if (!title) return;
    try {
      const r = await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!r.ok) throw new Error();
      await fetchTodos();
      setSnack({ open: true, msg: "Todo updated", severity: "success" });
    } catch {
      setSnack({ open: true, msg: "Update failed", severity: "error" });
    }
  };

  const toggleDone = async (t: Todo) => {
    try {
      const r = await fetch(`${api}/${t.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !t.done }),
      });
      if (!r.ok) throw new Error();
      await fetchTodos();
    } catch {
      setSnack({ open: true, msg: "Toggle failed", severity: "error" });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Todos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lisa, märgi tehtuks või muuda todo-d.
          </Typography>
        </Box>

        {/* vorm kohe pealkirja all */}
        <SubmitTodo
          fetchTodos={fetchTodos}
          onSuccess={() =>
            setSnack({ open: true, msg: "Todo added", severity: "success" })
          }
          onError={() =>
            setSnack({ open: true, msg: "Add failed", severity: "error" })
          }
        />

        <Divider />

        <List sx={{ width: "100%" }}>
          {todos.map((t) => (
            <ListItem key={t.id} divider sx={{ px: 0 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Checkbox
                  checked={t.done}
                  onChange={() => toggleDone(t)}
                  inputProps={{ "aria-label": "toggle done" }}
                />
                <Typography
                  sx={{ flex: 1 }}
                  style={{ textDecoration: t.done ? "line-through" : "none" }}
                >
                  {t.title}
                </Typography>

                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => updateTitle(t.id, t.title)}
                >
                  <EditIcon />
                </IconButton>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => softDelete(t.id)}
                >
                  Delete
                </Button>
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
    </Paper>
  );
};

export default Todos;
