import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitCatProps = {
  fetchCats: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

const SubmitCat = ({ fetchCats, onSuccess, onError }: SubmitCatProps) => {
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const r = await fetch("http://localhost:3000/cats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!r.ok) throw new Error();
      setName("");
      fetchCats();
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
            label="Cat name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default SubmitCat;
