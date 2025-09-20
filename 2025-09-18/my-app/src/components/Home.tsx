import { Box, Stack, Typography, TextField, Button, Chip } from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Tere tulemast!
      </Typography>

      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        efficitur, arcu vitae elementum placerat, justo tortor dignissim dui,
        nec gravida massa arcu nec est.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField fullWidth label="Otsing" placeholder="Kirjuta märksõna..." />
        <Button variant="contained">Otsi</Button>
      </Stack>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Kiirteemad
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="MUI" />
          <Chip label="React Router" />
          <Chip label="App Bar" />
        </Stack>
      </Box>
    </Stack>
  );
}
