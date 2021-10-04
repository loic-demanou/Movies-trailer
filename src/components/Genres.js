import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
        type,
        selectedGenres,
        setSelectedGenres , 
        genres,
        setGenres,
        setPage,
}) => {

    const handleAdd=(genre) =>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };
    const handleRemove=(genre) =>{
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=en-US`
        );
        setGenres(data.genres)
    };

    console.log(genres);

    useEffect(() => {
        fetchGenres();

        return ()=> {
            setGenres({});
        };
        // eslint-disable-next-line
    }, []);

    return ( 
        <div style= {{ padding: "6px 0" }}>
            {
                selectedGenres && selectedGenres.map((genre) => (
                    // eslint-disable-next-line
                    <Chip key={genre.id} label= {genre.name} style={{ margin:2 }} clickable size="small" color="primary" key={genre.id}
                    onDelete={() => handleRemove(genre)} />
                ) )
            }
            {
                genres && genres.map((genre) => (
                    // eslint-disable-next-line
                    <Chip key={genre.id} label= {genre.name} style={{ margin:2 }} clickable size="small" key={genre.id}
                    onClick={() => handleAdd(genre)} />
                ) )
            }
        </div>
     );
}
 
export default Genres;