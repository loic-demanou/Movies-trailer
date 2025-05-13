import "./ContentModal.css"
import React, { useEffect, useState } from 'react';
import { 
    Backdrop, 
    Box, 
    Modal, 
    Fade, 
    Typography,
    IconButton,
    Chip,
    Rating,
    Tooltip
} from '@mui/material';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import Carousel from "../Carousel/Carousel";
import loader from "../../Loader.gif"


const style = {
    position: 'absolute',
    color: "white",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    maxWidth: "1200px",
    height: "90%",
    maxHeight: "90vh",
    bgcolor: 'rgba(57, 68, 90, 0.95)',
    borderRadius: "16px",
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};

const modalContentStyle = {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    paddingRight: '8px',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
    },
};

export default function ContentModal({children, media_type, id}) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async() => {
        setIsLoading(true);
        try {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=fr-FR`
        );
        setContent(data);
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
        }
        setIsLoading(false);
    };

    const fetchVideo = async() => {
        try {
        const {data} = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=fr-FR`   
            );
        setVideo(data?.results[0]?.key);
        } catch (error) {
            console.error("Erreur lors du chargement de la vidéo:", error);
        }
    };

    useEffect(() => {
        if (open) {
        fetchData();
            fetchVideo();
        }
    }, [open]);

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    };

    return (
        <>
            <div 
                style={{ cursor:"pointer" }}  
                className="media" 
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    // transform: 'rotate(90deg)',
                                },
                                transition: 'all 0.3s ease',
                                zIndex: 2,
                                padding: '8px',
                            }}
                        >
                            {/* <span style={{ backgroundColor: 'transparent', color: 'transparent' }}>
                                close
                            </span> */}
                            <CloseIcon />
                        </IconButton>

                        <Box sx={modalContentStyle}>
                            {isLoading ? (
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    height: '100%'
                                }}>
                                    <img src={loader} alt="loading" style={{ width: "50px" }} />
                                </Box>
                            ) : content && (
                        <div className="ContentModal">
                                    <img 
                                        className="ContentModal__portrait" 
                                        src={content?.poster_path ? `${img_500}/${content?.poster_path}` : unavailable} 
                            alt={content?.name || content?.title}
                            />

                                    <img 
                                        className="ContentModal__landscape" 
                                        src={content?.backdrop_path ? `${img_500}/${content?.backdrop_path}` : unavailableLandscape} 
                            alt={content?.name || content?.title}
                            />

                            <div className="ContentModal__about">
                                        <Typography 
                                            variant="h4" 
                                            className="ContentModal__title"
                                        >
                                    {content?.name || content?.title}
                                            <Chip 
                                                // icon={<LanguageIcon />}
                                                label={content?.original_language?.toUpperCase()}
                                                size="small"
                                                sx={{ 
                                                    ml: 1,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    color: 'white'
                                                }}
                                            />
                                            <Typography 
                                                component="span" 
                                                sx={{ 
                                                    ml: 1,
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontSize: '0.9em'
                                                }}
                                            >
                                                ({content?.first_air_date || content?.release_date || "______"})
                                            </Typography>
                                        </Typography>

                                        {content?.tagline && (
                                            <Typography 
                                                variant="subtitle1" 
                                                className="tagline"
                                            >
                                                {content.tagline}
                                            </Typography>
                                        )}

                                        <Box sx={{ 
                                            display: 'flex', 
                                            gap: 2, 
                                            mb: 2,
                                            flexWrap: 'wrap'
                                        }}>
                                            <Tooltip title="Note moyenne">
                                                <Chip
                                                    // icon={<StarIcon />}
                                                    label={`${content?.vote_average?.toFixed(1)}/10`}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </Tooltip>
                                            {content?.runtime && (
                                                <Tooltip title="Durée">
                                                    <Chip
                                                        // icon={<AccessTimeIcon />}
                                                        label={formatRuntime(content.runtime)}
                                                        variant="outlined"
                                                    />
                                                </Tooltip>
                                            )}
                                            {content?.budget > 0 && (
                                                <Tooltip title="Budget">
                                                    <Chip
                                                        label={`Budget: ${parseFloat(content.budget).toLocaleString('fr-FR')} $`}
                                                        variant="outlined"
                                                    />
                                                </Tooltip>
                                            )}
                                        </Box>

                                        {content.genres && (
                                            <Box sx={{ mt:0 , mb: 2 }}>
                                                <Typography variant="subtitle1" color="white">
                                                    Genre
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                    {content.genres.map((genre) => (
                                                        <Chip key={genre.id} label={genre?.name} variant="outlined" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} />
                                                    ))}
                                                </Box>
                                            </Box>
                                        )}

                                        <Typography 
                                            variant="body1" 
                                            className="ContentModal__description"
                                        >
                                            {content?.overview || "Aucune description disponible."}
                                        </Typography>

                                        <Box sx={{ mt: 2 }}>
                                    <Carousel media_type={media_type} id={id} />
                                        </Box>

                                        {video && (
                                            <Button 
                                                className="watchbtn"
                                                variant="contained"
                                                startIcon={<YouTubeIcon />}
                                                href={`https://www.youtube.com/watch?v=${video}`}
                                target="_blank"
                                                rel="noopener noreferrer"
                                >
                                                Visionner la bande annonce
                                </Button>
                                        )}
                            </div>
                        </div>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}