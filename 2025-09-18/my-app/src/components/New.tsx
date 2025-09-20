import { Stack, Typography, TextField, Button } from "@mui/material";

export default function New() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Uus leht</Typography>
      <Typography>
        Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. In hac
        habitasse platea dictumst. Integer lacinia sollicitudin massa.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="E-post"
          type="email"
          placeholder="nimi@domeen.ee"
        />
        <Button variant="outlined">Salvesta</Button>
      </Stack>
    </Stack>
  );
}
