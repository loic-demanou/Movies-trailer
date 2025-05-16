import React from 'react';
import { Badge, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import './SingleContent.css';
import { useAuth } from '../../contexts/AuthContext';

const SingleContent = ({id, poster, title, date, media_type, vote_average}) => {
    const { currentUser, wishlist, addToWishlist, removeFromWishlist, wishlistLoading } = useAuth();

    const isInWishlist = currentUser ? wishlist.some(item => item.id === id) : false;

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        if (!currentUser || wishlistLoading) return;

        const itemData = {
            id,
            poster_path: poster,
            title: title,
            date,
            type: media_type,
            vote_average: vote_average,
        };

        if (isInWishlist) {
            removeFromWishlist(id);
        } else {
            addToWishlist(itemData);
        }
    };

    return ( 
        <div className="media">
            {currentUser && (
                <IconButton 
                    onClick={handleWishlistToggle} 
                    className="wishlist-button" 
                    disabled={wishlistLoading} 
                    size="small"
                    sx={{ 
                        position: 'absolute', 
                        top: 5, 
                        right: 2, 
                        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: isInWishlist ? '#ff6b6b' : 'white',
                        zIndex: 10,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            transform: 'scale(1.1)'
                        },
                        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out'
                    }}
                >
                    {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            )}
            <ContentModal media_type={media_type} id={id} className="content-modal" 
                sx={{
                    position: 'relative',
                    // zIndex: 10,
                }}
            >
                <Badge badgeContent= {vote_average ? vote_average.toFixed(1) : 'N/A'} color= {vote_average >= 8 ? 'success'  : vote_average > 6 && vote_average<8 ? 'primary' : 'secondary'} />
                <img className="poster" src={poster ? `${ img_300 }/${poster}` : unavailable} alt={title} />
                <strong className="title">{title}</strong>
                <span className="subTitle">
                    {media_type === "tv" ? "Série TV" : "Film"}
                    <span className="date">{date}</span> 
                </span>
            </ContentModal>
        </div>
     );
}
 
export default SingleContent;