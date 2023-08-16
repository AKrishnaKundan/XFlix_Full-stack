import {
    Box, 
    Button, 
} from "@mui/material";
import {useHistory} from "react-router-dom";

import "./Header.css";

const Header = ({handleUploadButton, children})=>{
    const history = useHistory();
    return (
        <Box className="header" name="header">
            <Box className="header-logo"  onClick={()=>{
              history.push(``,{from:"/"});
            }}>
               <img src="/X.png" alt="QKart-icon" className="icon1"/>
                &nbsp;
               <img src="/Flix.png" alt="QKart-icon" className="icon2"/>
            </Box>
            {children}
            {
                (children)?
                <Button variant="contained" onClick={handleUploadButton}>
                    Upload
                </Button>
                :
                <div className="video-page-height"></div>
            }
        </Box>
    );
}

export default Header;