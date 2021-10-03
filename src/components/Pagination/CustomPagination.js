import { ThemeProvider } from "@emotion/react";
// import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme, Pagination } from "@mui/material";

const CustomPagination = ({setPage, numOfPages=10}) => {

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
        },
    });

    const handlePageChange = (page) =>{
        setPage(page);
        window.scroll(0, 0);
    };

    return ( 
        <div style={{ display:"flex", justifyContent: "center", marginTop: 10 }}>
            <ThemeProvider theme={darkTheme} > 
                <Pagination 
                count={numOfPages} onChange = {(e) => handlePageChange(e.target.textContent)} 
                hideNextButton
                hidePrevButton
                color="primary"
                />
            </ThemeProvider>
        </div>
     );
}
 
export default CustomPagination;