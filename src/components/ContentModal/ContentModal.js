import "./ContentModal.css"
import  React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from "../Carousel/Carousel";
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    color: "white",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "70%",
    bgcolor: '#39445a',
    borderRadius:5,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ContentModal({children, media_type, id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();


    const fetchData = async() => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=fr-FR`
        );
        console.log(data);
        setContent(data);
    };
    const fetchVideo = async() => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=en-EN`   
            );
            console.log(data);
        setVideo(data.results[0]?.key);
    };

    useEffect(() =>{
        fetchData();
        fetchVideo()
        // eslint-disable-next-line
    }, [] )

    return (
        <>
            <div 
                style={{ cursor:"pointer" }}  
                className="media" 
                onClick={handleOpen}>{children}
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

                   {content && (<Box sx={style}>
                        <div className="ContentModal">
                            <img className="ContentModal__portrait" 
                            src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} 
                            alt={content.name || content.title}
                            />

                            <img className="ContentModal__landscape" 
                            src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailableLandscape} 
                            alt={content.name || content.title}
                            />
                            <div className="ContentModal__about">
                                <span className="ContentModal__title" style={{ fontSize:"33px", marginBottom:"15px" }}>
                                    {content.name || content.title}
                                    <small style={{ fontSize:"15px", margin:"10px" }}> { content.original_language}</small>
                                     ({
                                        (
                                            content.first_air_date || content.release_date || "______"
                                            ).substring(0, 4)
                                        })
                                </span>
                                { content.tagline && ( <i className="tagline">{content.tagline}</i> )}
                                <span className="ContentModal__description">{content.overview}</span>
                                <div>
                                    <Carousel media_type={media_type} id={id} />
                                    {content.budget && <span class={{ margin:"29px" }}>Budget de réalisation total : { parseFloat(content.budget).toLocaleString('en') } $</span>}
                                </div>
                                <Button className="watchbtn" style={{ backgroundColor:"red", opacity: 0.7, color:"white" }} startIcon={<YouTubeIcon />}
                                // color="secondary"
                                target="_blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Visionnez la bande annonce 🤩
                                </Button>
                            </div>
                                <span style={{ cursor:"pointer"}} >
                                    <CloseIcon onClick= {handleClose} />  
                                </span>
                        </div>
                    </Box>)}
                </Fade>
            </Modal>
        </>
    );
}