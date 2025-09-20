import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function About() {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="overline">Profiil</Typography>
        <Typography variant="h3" fontWeight={800}>
          Marcus Puust
        </Typography>
        <Typography color="text.secondary">
          Tere! Siin on minu huvid ja kontaktivorm MUI komponentidega.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Huvid & hobid
        </Typography>
        <List sx={{ pl: 1 }}>
          <ListItem>⚽ Jalgpall</ListItem>
          <ListItem>💻 Programmeerimine</ListItem>
          <ListItem>🏋️‍♂️ Jõusaal</ListItem>
        </List>
      </Box>

      <Box
        component="form"
        noValidate
        onSubmit={(e) => e.preventDefault()}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">Võta ühendust</Typography>

          <TextField
            label="E-mail"
            name="email"
            type="email"
            placeholder="sina@gmail.com"
            fullWidth
            required
          />

          <TextField
            label="Sõnum"
            name="message"
            placeholder="Edasta oma sõnum..."
            fullWidth
            multiline
            minRows={4}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button type="submit" variant="contained" size="large">
              Võta ühendust
            </Button>
            <Button component={RouterLink} to="/" variant="text">
              Tagasi avalehele
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
