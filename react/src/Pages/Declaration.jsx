import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';

const documents = [
  { title: 'Attestation Quizz', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' },
  { title: 'Fiche d’adhesion', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' },
  { title: 'Attestation Quizz', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' },
  { title: 'Attestation Quizz', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' },
  { title: 'Attestation Quizz', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' },
  { title: 'Attestation Quizz', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' },
  { title: 'Attestation Quizz', session: 'Session 2025', code: '1600w-jXnTMrKSp5E' }
];

const user = {
  nom: 'Doe',
  prenom: 'John',
  email: 'john.doe@example.com',
  score: '85%',
};

const generatePDF = (doc) => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const img = new Image();
  img.src = '/attestation.png'; // Assurez-vous que le fichier est dans le dossier public

  img.onload = () => {
    // Ajouter l’image comme fond
    pdf.addImage(img, 'PNG', 0, 0, 297, 210); // A4 paysage = 297x210mm

    // Ajouter le texte par-dessus
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.text(`${user.prenom} ${user.nom}`, 148, 120, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(`Score : ${user.score}`, 148, 135, { align: 'center' });
    pdf.text(`Session : ${doc.session}`, 148, 145, { align: 'center' });

    pdf.save(`attestation_${user.nom}_${user.prenom}.pdf`);
  };
};

const Declaration = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', padding: 4, width: '100vw', height: '100vh' }}>
      <Paper elevation={2}>
        <List>
          {documents.map((doc, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {doc.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2">{doc.session}</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {doc.code}
                    </Typography>
                  </>
                }
              />
              <IconButton edge="end" aria-label="download" onClick={() => generatePDF(doc)}>
                <DownloadIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Declaration;
