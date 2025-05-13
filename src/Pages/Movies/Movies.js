import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../hooks/useGenre";
import loader from "../../Loader.gif"


const Movies = () => {

    const [page, setPage] =useState(1);
    const [content, setContent] =useState([]);
    const [numOfPages, setNumOfPages] =useState();
    const [selectedGenres, setSelectedGenres] =useState([]);
    const [genres, setGenres] =useState([]);
    const genreforURL = useGenres(selectedGenres);
    const [isLoading, setIsLoading] = useState(false);


    const fetchMovies = async() =>{
        setIsLoading(true);

        const {data}= await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
                
            // `https://api.themoviedb.org/3/discover/movie?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`
            );
            setIsLoading(false);
        // console.log(data);
        setContent(data.results)
        setNumOfPages(data.total_pages)
    };

    useEffect(() =>{
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreforURL])

    return ( 
        <div>
            {!isLoading && <span className="pageTitle">Films</span>}
            {isLoading && <span className="loader"> <img src={loader} alt="loading" />Chargement...</span>}
                <Genres 
                    type= "movie" 
                    selectedGenres={selectedGenres} 
                    setSelectedGenres={setSelectedGenres} 
                    genres= {genres}
                    setGenres={setGenres}
                    setPage={setPage}
                />
            <div className="trending">
                { content && content.map((c) => (
                    // console.log(c)
                    <SingleContent key={c.id} 
                    id= {c.id}
                    poster= {c.poster_path}
                    title= {c.title || c.name}
                    date= {c.first_air_date || c.release_date}
                    media_type= 'movie'
                    vote_average= {c.vote_average}
                    />
                ))}
            </div>
            { numOfPages >1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}

        </div>

     );
}
 
export default Movies;