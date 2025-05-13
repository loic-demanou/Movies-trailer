import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import loader from "../../Loader.gif"

const Trending = () => {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [numOfPages, setNumOfPages] = useState(1);


    const fetchTrending= async () => {  
        setIsLoading(true);
        const { data } = await axios.get(
            ` https://api.themoviedb.org/3/trending/all/day?api_key=5f51e3826ff9c24552ad45bbae31bf26&page=${page}`
            // ` https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
            );
            setIsLoading(false);
        setContent(data.results)
        console.log(data.total_pages);
        setNumOfPages(data.total_pages)
    };

    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line
    }, [page])


    return ( 
        <div>
            {!isLoading && <span className="pageTitle">Les Tendances</span>}
            {isLoading && <span className="loader"> <img src={loader} alt="loading" />Chargement...</span>}
            <div className="trending">
                { content && content.map((c) => (
                    <SingleContent key={c.id} 
                    id= {c.id}
                    poster= {c.poster_path}
                    title= {c.title || c.name}
                    date= {c.first_air_date || c.release_date}
                    media_type= {c.media_type}
                    vote_average= {c.vote_average}
                    />
                ))}
            </div>
            {numOfPages >1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />} 
        </div>
     );
}
 
export default Trending;