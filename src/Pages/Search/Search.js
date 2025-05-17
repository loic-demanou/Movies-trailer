import { Button, createTheme, Tab, Tabs, TextField, Box, Container, Typography, Paper } from "@mui/material";
// import { Button, createMuiTheme, Tab, Tabs, TextField } from "@material-ui/core";
// import { ThemeProvider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { Movie as MovieIcon, Tv as TvIcon } from "@mui/icons-material";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import loader from "../../Loader.gif"
import "./Search.css";
import { FaSearch } from "react-icons/fa";

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

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",
            },
            background: {
                default: "#1a1a1a",
                paper: "#2d2d2d",
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInputBase-input": {
                            color: "white",
                            fontSize: "1.1rem",
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "1.1rem",
                        },
                        "& .MuiFilledInput-root": {
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                            "&.Mui-focused": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.2)",
                            },
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                        padding: "12px 24px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        fontSize: "1rem",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                    },
                },
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
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    {!isLoading && (
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                textAlign: "center", 
                                mb: 4,
                                fontWeight: 600,
                                background: "linear-gradient(45deg, #fff 30%, #aaa 90%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Rechercher un(e) film/série
                        </Typography>
                    )}
                    {isLoading && (
                        <Box sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center",
                            gap: 2,
                            mb: 4 
                        }}>
                            <img src={loader} alt="loading" style={{ width: "40px" }} />
                            <Typography variant="h6">Chargement...</Typography>
                        </Box>
                    )}

                    <Paper 
                        elevation={3} 
                        sx={{ 
                            p: 3, 
                            mb: 4, 
                            borderRadius: "16px",
                            background: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                            <TextField 
                                fullWidth
                                label="Rechercher"
                                variant="filled"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && fetchSearch()}
                                InputProps={{
                                    endAdornment: (
                                        <Button 
                                            variant="contained" 
                                            onClick={fetchSearch}
                                            sx={{ 
                                                minWidth: "auto",
                                                px: 2,
                                                height: "100%",
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                            }}
                                        >
                                            <FaSearch size={20} />
                                        </Button>
                                    ),
                                }}
                            />
                        </Box>

                        <Tabs 
                            value={type} 
                            onChange={(event, newValue) => {
                                setType(newValue);
                                setPage(1);
                            }}
                            centered
                            sx={{
                                "& .MuiTabs-indicator": {
                                    height: 3,
                                    borderRadius: "3px",
                                },
                            }}
                        >
                            <Tab 
                                icon={<MovieIcon />} 
                                label="Films" 
                                iconPosition="start"
                                sx={{ 
                                    minWidth: "200px",
                                    "&.Mui-selected": {
                                        color: "#fff",
                                    },
                                }}
                            />
                            <Tab 
                                icon={<TvIcon />} 
                                label="Séries TV" 
                                iconPosition="start"
                                sx={{ 
                                    minWidth: "200px",
                                    "&.Mui-selected": {
                                        color: "#fff",
                                    },
                                }}
                            />
                        </Tabs>
                    </Paper>

                    <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                        mb: 4
                    }}>
                        {content && content.map((c) => (
                            <SingleContent 
                                key={c.id} 
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type={type ? "tv" : "movies"}
                                vote_average={c.vote_average}
                            />
                        ))}
                    </Box>

                    {searchText && !content && (
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                textAlign: "center", 
                                color: "rgba(255, 255, 255, 0.7)",
                                mt: 4 
                            }}
                        >
                            {type ? "Aucune série trouvée" : "Aucun film trouvé"}
                        </Typography>
                    )}

                    {numOfPages > 1 && (
                        <Box sx={{ mt: 4, mb: 2 }}>
                            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
 
export default Search;