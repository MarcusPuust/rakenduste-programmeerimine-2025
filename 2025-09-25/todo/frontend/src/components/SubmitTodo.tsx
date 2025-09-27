import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

const API = "http://localhost:3000/todos";

const SubmitTodo = ({
  fetchTodos,
  onSuccess,
  onError,
}: {
  fetchTodos: () => Promise<void>;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const [title, setTitle] = useState("");

  const submit = async () => {
    const value = title.trim();
    if (!value) return;
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ title: value }),
      });
      if (!r.ok) throw new Error();
      setTitle("");
      await fetchTodos();
      onSuccess?.();
    } catch {
      onError?.();
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ width: "100%" }} // <-- täislaius
    >
      <TextField
        fullWidth
        label="New todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <Button variant="contained" onClick={submit} sx={{ minWidth: 120 }}>
        Add
      </Button>
    </Stack>
  );
};

export default SubmitTodo;
