import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import './SingleContent.css';

const SingleContent = ({id, poster, title, date, media_type, vote_average,}) => {
    return ( 
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent= {vote_average} color= {vote_average >= 8 ? 'success'  : vote_average > 6 && vote_average<8 ? 'primary' : 'secondary'} />
            <img className="poster" src={poster ? `${ img_300 }/${poster}` : unavailable} alt={title} />
            <strong className="title">{title}</strong>
            <span className="subTitle">
                {media_type === "tv" ? "Série TV" : "Film"}
                <span className="subTitle">{date}</span>
            </span>
        </ContentModal>
     );
}
 
export default SingleContent;