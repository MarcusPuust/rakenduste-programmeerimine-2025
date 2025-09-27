import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
  fetchTodos: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

const SubmitTodo = ({ fetchTodos, onSuccess, onError }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const r = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!r.ok) throw new Error();
      setTitle("");
      fetchTodos();
      onSuccess?.();
    } catch {
      onError?.();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitTodo;
