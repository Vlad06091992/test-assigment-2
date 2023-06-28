import {CircularProgress, Grid} from "@mui/material";

export const Preloader = () => {
    return (
        <Grid sx={{ height: '100%' }} container alignItems={'center'} justifyContent={'center'}>
            <CircularProgress size={200} />
        </Grid>
    )
}