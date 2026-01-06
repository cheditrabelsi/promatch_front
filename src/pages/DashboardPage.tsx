import React, { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  IconButton, 
  Tabs, 
  Tab, 
  Stack, 
  Grid,
  SelectChangeEvent
} from '@mui/material';

// Icônes
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WorkIcon from '@mui/icons-material/Work';

// Context & Service
import { AuthContext } from '../providers/AuthProvider'; 
import { jobService } from '../services/job.service';

// Models (Interfaces)
import { IJob } from '../interfaces/models/job/IJob';
import { IApplication } from '../interfaces/models/job/IApplication';

// Navbar
import Navbar from './NavBar/Navbar'; 

const DashboardPage: React.FC = () => {
    // const { logoutUser } = useContext(AuthContext); // Décommenter si besoin

    // --- COULEURS DU THEME ---
    const tealColor = '#2DAA9E';
    const darkTextColor = '#18191C'; 

    // --- ETATS ---
    const [currentTab, setCurrentTab] = useState(0); 
    const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
    
    // Typage strict des tableaux
    const [myJobs, setMyJobs] = useState<IJob[]>([]);
    const [jobCandidates, setJobCandidates] = useState<IApplication[]>([]);
    
    const [jobData, setJobData] = useState<IJob>({ 
        title: '', location: '', salary: '', description: '', requirements: '', category: '', job_type: 'FULL_TIME' 
    });
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // --- CHARGEMENT ---
    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await jobService.getMyJobs();
            setMyJobs(data);
        } catch (error) {
            console.error("Erreur chargement jobs", error);
        }
    };

    // --- HANDLERS ---

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const name = e.target.name as keyof IJob;
        const value = e.target.value;
        setJobData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeleteJob = async (jobId: number) => {
        if(!window.confirm("Supprimer cette offre ?")) return;
        try {
            await jobService.deleteJob(jobId);
            setMsg({ type: 'success', text: 'Offre supprimée.' });
            loadJobs();
        } catch (error) { 
            alert("Erreur suppression"); 
        }
    };

    const handleViewCandidates = async (job: IJob) => {
        if (!job.id) return;
        setSelectedJob(job);
        try {
            const data = await jobService.getJobCandidates(job.id);
            setJobCandidates(data);
        } catch (error) { console.error(error); }
    };

    const handlePostJob = async (e: FormEvent) => {
        e.preventDefault();
        setMsg(null);
        try {
            await jobService.createJob(jobData);
            setMsg({ type: 'success', text: 'Offre publiée avec succès !' });
            setJobData({ title: '', location: '', salary: '', description: '', requirements: '', category: '', job_type: 'FULL_TIME' });
            loadJobs();
            setCurrentTab(0); 
        } catch (error) {
            setMsg({ type: 'error', text: 'Erreur lors de la publication.' });
        }
    };

    const handleStatusChange = async (appId: number, newStatus: string) => {
        try {
            await jobService.updateApplicationStatus(appId, newStatus);
            setJobCandidates(prev => prev.map(app => 
                app.id === appId ? { ...app, status: newStatus as any } : app
            ));
        } catch (error) { alert("Erreur mise à jour"); }
    };

    const getScoreColor = (score: number) => {
        if (score >= 70) return "success";
        if (score >= 40) return "warning";
        return "error";
    };

    // --- STYLE TABS ---
    const tabStyle = {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        '&.Mui-selected': { color: tealColor },
    };

    return (
        <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* ================================================================= */}
            {/* ⬛ HEADER NOIR (Navbar + Titre) ⬛ */}
            <Box sx={{ bgcolor: 'black', color: 'white' }}>
                <Box sx={{ px: { xs: 3, lg: 12 }, pt: 3 }}>
                    <Navbar />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
                    <Typography variant="h3" fontWeight="bold">
                        Recruiter Dashboard
                    </Typography>
                </Box>
            </Box>
            {/* ================================================================= */}

            <Container maxWidth="lg" sx={{ flexGrow: 1, py: 8, mt: -6, zIndex: 2 }}>
                
                {msg && <Alert severity={msg.type} sx={{ mb: 3, borderRadius: 2 }}>{msg.text}</Alert>}

                {/* --- VUE 1 : DETAIL OFFRE & LISTE CANDIDATS --- */}
                {selectedJob ? (
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                            <Button 
                                startIcon={<ArrowBackIcon />} 
                                onClick={() => setSelectedJob(null)} 
                                sx={{ color: darkTextColor, textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Back
                            </Button>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">{selectedJob.title}</Typography>
                                <Typography variant="body2" color="text.secondary">Gestion des candidatures</Typography>
                            </Box>
                        </Stack>

                        <TableContainer>
                            <Table>
                                <TableHead sx={{ bgcolor: '#F0F2F5' }}>
                                    <TableRow>
                                        <TableCell><strong>Candidat</strong></TableCell>
                                        <TableCell><strong>Score IA</strong></TableCell>
                                        <TableCell><strong>Statut</strong></TableCell>
                                        <TableCell><strong>Date</strong></TableCell>
                                        <TableCell align="right"><strong>Action</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobCandidates.length === 0 ? (
                                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}>Aucun candidat pour le moment.</TableCell></TableRow>
                                    ) : (
                                        jobCandidates.map((app) => (
                                            <TableRow key={app.id} hover>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight="bold">{app.candidate_name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{app.candidate_email}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={`${app.ai_match_score}% Match`} color={getScoreColor(app.ai_match_score)} size="small" variant="outlined" />
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl size="small" variant="standard" sx={{ minWidth: 130 }}>
                                                        <Select 
                                                            value={app.status} 
                                                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                            disableUnderline
                                                            sx={{ fontWeight: 'bold', color: tealColor }}
                                                        >
                                                            <MenuItem value="PENDING">En attente</MenuItem>
                                                            <MenuItem value="IN_PROGRESS">En cours</MenuItem>
                                                            <MenuItem value="INTERVIEW">Entretien</MenuItem>
                                                            <MenuItem value="ACCEPTED">Accepté</MenuItem>
                                                            <MenuItem value="REJECTED">Refusé</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>{new Date(app.applied_at).toLocaleDateString()}</TableCell>
                                                <TableCell align="right">
                                                    <Button 
                                                        variant="outlined" 
                                                        size="small" 
                                                        href={app.cv} 
                                                        target="_blank"
                                                        sx={{ color: tealColor, borderColor: tealColor, textTransform: 'none' }}
                                                    >
                                                        Voir CV
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) : (
                    // --- VUE 2 : TABLEAU DE BORD (LISTE OFFRES & FORMULAIRE) ---
                    <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 2 }}>
                            <Tabs 
                                value={currentTab} 
                                onChange={(e, v) => setCurrentTab(v)}
                                TabIndicatorProps={{ style: { backgroundColor: tealColor } }}
                            >
                                <Tab label="Mes Offres" icon={<WorkIcon />} iconPosition="start" sx={tabStyle} />
                                <Tab label="Publier une offre" icon={<AddCircleOutlineIcon />} iconPosition="start" sx={tabStyle} />
                            </Tabs>
                        </Box>

                        <Box sx={{ p: 4 }}>
                            {/* LISTE DES OFFRES */}
                            {currentTab === 0 && (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Poste</strong></TableCell>
                                                <TableCell><strong>Lieu</strong></TableCell>
                                                <TableCell><strong>Publié le</strong></TableCell>
                                                <TableCell align="right"><strong>Actions</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {myJobs.length === 0 ? (
                                                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4 }}>Vous n'avez publié aucune offre.</TableCell></TableRow>
                                            ) : (
                                                myJobs.map((job) => (
                                                    <TableRow key={job.id} hover>
                                                        <TableCell>
                                                            <Typography variant="subtitle1" fontWeight="bold" color={darkTextColor}>{job.title}</Typography>
                                                            <Chip label={job.job_type} size="small" sx={{ mt: 0.5, bgcolor: '#E0F2F1', color: '#00695C', fontSize: '0.7rem' }} />
                                                        </TableCell>
                                                        <TableCell>{job.location}</TableCell>
                                                        <TableCell>{job.created_at ? new Date(job.created_at).toLocaleDateString() : '-'}</TableCell>
                                                        <TableCell align="right">
                                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                                <Button 
                                                                    variant="contained" 
                                                                    size="small" 
                                                                    startIcon={<VisibilityIcon />} 
                                                                    onClick={() => handleViewCandidates(job)} 
                                                                    sx={{ bgcolor: tealColor, '&:hover': { bgcolor: '#248f85' }, textTransform: 'none' }}
                                                                >
                                                                    Candidats
                                                                </Button>
                                                                <IconButton onClick={() => job.id && handleDeleteJob(job.id)} sx={{ color: '#ef5350' }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            {/* FORMULAIRE DE PUBLICATION */}
                            {currentTab === 1 && (
                                <Box component="form" onSubmit={handlePostJob}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Titre du poste" name="title" value={jobData.title} onChange={handleInputChange} required variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Lieu" name="location" value={jobData.location} onChange={handleInputChange} required variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Type de contrat</InputLabel>
                                                <Select label="Type de contrat" name="job_type" value={jobData.job_type} onChange={handleSelectChange}>
                                                    <MenuItem value="FULL_TIME">CDI / Plein temps</MenuItem>
                                                    <MenuItem value="PART_TIME">Temps partiel</MenuItem>
                                                    <MenuItem value="FREELANCE">Freelance</MenuItem>
                                                    <MenuItem value="INTERNSHIP">Stage</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField fullWidth label="Catégorie (ex: IT, Finance)" name="category" value={jobData.category} onChange={handleInputChange} required variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Salaire (Optionnel)" name="salary" value={jobData.salary} onChange={handleInputChange} variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth multiline rows={4} label="Description du poste" name="description" value={jobData.description} onChange={handleInputChange} required variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Compétences requises (séparées par des virgules)" name="requirements" value={jobData.requirements} onChange={handleInputChange} required variant="outlined" helperText="Ex: React, Python, SQL" />
                                        </Grid>
                                    </Grid>

                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        size="large"
                                        fullWidth
                                        sx={{ mt: 4, bgcolor: tealColor, py: 1.5, fontWeight: 'bold', fontSize: '1rem', '&:hover': { bgcolor: '#248f85' }, textTransform: 'none' }}
                                    >
                                        Publier l'offre
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default DashboardPage;