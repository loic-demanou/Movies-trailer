import { Button, createMuiTheme, Tab, Tabs, TextField } from "@mui/material";
// import { Button, createMuiTheme, Tab, Tabs, TextField } from "@material-ui/core";
// import { ThemeProvider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import loader from "../../Loader.gif"


const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();
    const [isLoading, setIsLoading] = useState(false);


    // const darkTheme = createMuiTheme({
    //     palette: {
    //         type: "dark",
    //     },
    // });

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary:{
                main:"#fff",
            },
        },
    });

    const fetchSearch = async () => {
        
        setIsLoading(true);
        try {
            const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=5f51e3826ff9c24552ad45bbae31bf26&language=fr-FR&query=${searchText}&page=${page}&include_adult=false`
            );
            
            setContent(data.results);
            setNumOfPages(data.total_pages);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return ( 
        <div>
            {!isLoading && <span className="pageTitle">Rechercher un(e) film/serie</span>}
            {isLoading && <span className="loader"> <img src={loader} alt="loading" />Chargement...</span>}

            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin:"15px 0" }}>
                    <TextField 
                    style= {{ flex:1, color: "primary" }}
                    className="searchBox"
                    textColor="primary"
                    label="Rechercher"
                    variant="filled"
                    
                    onChange= {(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginLeft:10 }} onClick={fetchSearch} >
                        <SearchIcon />
                    </Button>
                </div>

                <Tabs value={type} indicatorColor="primary" textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                style={{ paddingBottom:5 }}
                >
                    <Tab style={{ width:"50%", color:"white" }} label="Trouvez des films" />
                    <Tab style={{ width:"50%", color:"white" }} label="Trouvez des Series TV" />
                </Tabs>
            </ThemeProvider>

            <div className="trending">
                { content && content.map((c) => (
                    // console.log(c)
                    <SingleContent key={c.id} 
                    id= {c.id}
                    poster= {c.poster_path}
                    title= {c.title || c.name}
                    date= {c.first_air_date || c.release_date}
                    media_type= {type ?"tv" : "movies"}
                    vote_average= {c.vote_average}
                    />
                ))}
                {searchText && !content && (type ? <h2>Aucune serie trouvée</h2> : <h2>Aucun film trouvé</h2>)}
            </div>
            { numOfPages >1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}

        </div>

     );
}
 
export default Search;