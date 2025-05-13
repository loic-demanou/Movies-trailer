import { ThemeProvider } from "@emotion/react";
// import { MuiThemeProvider } from "@material-ui/core";
import { createTheme, Pagination } from "@mui/material";

const CustomPagination = ({setPage, numOfPages=10}) => {

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",
            },
        },
        components: {
            MuiPagination: {
                styleOverrides: {
                    root: {
                        "& .MuiPaginationItem-root": {
                            color: "#fff",
                        },
                    },
                },
            },
        },
    });

    const handlePageChange = (event, value) =>{
        setPage(value);
        window.scroll(0, 0); 
        console.log(value);
    };

    return ( 
        <div style={{ display:"flex", justifyContent: "center", marginTop: 10, color: "white" }}>
            <ThemeProvider theme={darkTheme}> 
                <Pagination 
                count={numOfPages} 
                onChange={handlePageChange}
                hideNextButton
                hidePrevButton
                color="primary"
                />
            </ThemeProvider>
        </div>
     );
}
 
export default CustomPagination;