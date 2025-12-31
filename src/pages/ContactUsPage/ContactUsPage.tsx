import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import axios from 'axios';

// ✅ IMPORT DE VOTRE NAVBAR EXISTANTE
import Navbar from '../NavBar/Navbar';

// Icons
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactUsPage: React.FC = () => {
  // --- COULEURS ---
  const tealColor = '#2DAA9E';
  const cardBgColor = '#EBF4F2';
  const darkTextColor = '#18191C';

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    open: boolean;
    type: 'success' | 'error';
    msg: string;
  }>({
    open: false,
    type: 'success',
    msg: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/users/contact/', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: 'Contact',
        message: formData.message,
      });

      setStatus({
        open: true,
        type: 'success',
        msg: 'Message sent successfully!',
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    } catch {
      setStatus({
        open: true,
        type: 'error',
        msg: 'Error sending message.',
      });
    }
  };

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ⬛ HEADER NOIR (Structure de l'ami) ⬛ */}
      <Box sx={{ bgcolor: 'black', color: 'white' }}>
        <Box sx={{ px: { xs: 3, lg: 12 }, pt: 3 }}>
           <Navbar />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
           <Typography variant="h3" fontWeight="bold">
             Contact Us
           </Typography>
        </Box>
      </Box>

      {/* ⚪ CONTENU PRINCIPAL (Remplacé Grid par Flexbox) ⚪ */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 8 }}>
        
        {/* Conteneur principal Flex : remplace <Grid container> */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, // Colonne sur mobile, Ligne sur PC
          gap: 8, // Espace entre gauche et droite
          alignItems: 'flex-start' 
        }}>
          
          {/* --- PARTIE GAUCHE (TEXTE & ICONES) --- */}
          <Box sx={{ flex: 1, width: '100%' }}>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{ 
                  color: darkTextColor, 
                  mb: 2, 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  lineHeight: 1.2
                }}
              >
                You Will Grow, You Will Succeed. We Promise That
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 6, lineHeight: 1.6 }}
              >
                Our dedicated support team is here to help you navigate your career journey. Whether you have questions or need assistance, we are just a message away.
              </Typography>

              {/* Conteneur des Icônes : Flex Wrap au lieu de Grid */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: 4, columnGap: 2 }}>
                
                {/* Icone 1 */}
                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Stack spacing={1}>
                    <CallIcon sx={{ color: tealColor, fontSize: 28 }} />
                    <Typography fontWeight="bold" color={darkTextColor}>Call for inquiry</Typography>
                    <Typography variant="body2" color="text.secondary">+216 24 388-685</Typography>
                  </Stack>
                </Box>

                {/* Icone 2 */}
                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Stack spacing={1}>
                    <EmailIcon sx={{ color: tealColor, fontSize: 28 }} />
                    <Typography fontWeight="bold" color={darkTextColor}>Send us email</Typography>
                    <Typography variant="body2" color="text.secondary">promatchdsa@gmail.com</Typography>
                  </Stack>
                </Box>

                {/* Icone 3 */}
                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Stack spacing={1}>
                    <AccessTimeIcon sx={{ color: tealColor, fontSize: 28 }} />
                    <Typography fontWeight="bold" color={darkTextColor}>Opening hours</Typography>
                    <Typography variant="body2" color="text.secondary">Mon - Fri: 10AM - 10PM</Typography>
                  </Stack>
                </Box>

                {/* Icone 4 */}
                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                  <Stack spacing={1}>
                    <LocationOnIcon sx={{ color: tealColor, fontSize: 28 }} />
                    <Typography fontWeight="bold" color={darkTextColor}>Office</Typography>
                    <Typography variant="body2" color="text.secondary">19 Ariana</Typography>
                  </Stack>
                </Box>
              </Box>
          </Box>

          {/* --- PARTIE DROITE (FORMULAIRE) --- */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                bgcolor: cardBgColor,
              }}
            >
              <Typography align="center" fontWeight="bold" variant="h5" gutterBottom>
                Contact Info
              </Typography>
              <Typography
                align="center"
                color="text.secondary"
                variant="body2"
                sx={{ mb: 4 }}
              >
                We are here to assist you with any questions.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                {/* Remplacement du Grid interne par Stack (Flex vertical) */}
                <Stack spacing={2}>
                  
                  {/* Ligne 1 : Nom / Prénom (Flex horizontal) */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" fontWeight="bold" sx={{ mb: 0.5, display: 'block' }}>First Name</Typography>
                      <TextField
                        fullWidth
                        placeholder="Your name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 1 } }} 
                        size="medium"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" fontWeight="bold" sx={{ mb: 0.5, display: 'block' }}>Last Name</Typography>
                      <TextField
                        fullWidth
                        placeholder="Your last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                        size="medium"
                      />
                    </Box>
                  </Stack>

                  {/* Ligne 2 : Email */}
                  <Box>
                    <Typography variant="caption" fontWeight="bold" sx={{ mb: 0.5, display: 'block' }}>Email Address</Typography>
                    <TextField
                      fullWidth
                      type="email"
                      placeholder="Your E-mail address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                      size="medium"
                    />
                  </Box>

                  {/* Ligne 3 : Message */}
                  <Box>
                    <Typography variant="caption" fontWeight="bold" sx={{ mb: 0.5, display: 'block' }}>Message</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      placeholder="Your message..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: tealColor,
                      color: 'white',
                      py: 1.5,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderRadius: 1,
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#248f85', boxShadow: 'none' },
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={status.open}
        autoHideDuration={6000}
        onClose={() => setStatus({ ...status, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={status.type} sx={{ width: '100%' }}>{status.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUsPage;