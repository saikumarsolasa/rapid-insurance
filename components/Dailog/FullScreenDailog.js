import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import styles from './Dailog.module.scss'
import { GetModels, GetVarients, GetLocations } from '../../helper/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ closeHandler, state, data, dataHandler }) => {



    const [vechileData, setVehicleData] = React.useState(data)
    const [vehicleDetails, setVehicleDetails] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        // console.log(data)
    }, [])

    const selectHandler = async (value) => {
        setVehicleDetails({
            ...vehicleDetails,
            ...value
        })
        if (value?.c_make_code) {
            const data = await GetModels(value.c_make_code);
            setVehicleData(data.models)
        }

        if (value?.c_model_code) {
            const data = await GetVarients(vehicleDetails.c_make_code, value.c_model_code);
            setVehicleData(data.varients)
        }

        if (value?.c_variant_code) {
            dataHandler({ ...vehicleDetails, ...value });
            closeHandler();
        }

        if (value?.c_rto_state_code) {
            const data = await GetLocations(value.c_rto_state_code);
            console.log(data);
            setVehicleData(data.data)
        }

        if (value?.c_rto_location_code) {
            dataHandler({ ...vehicleDetails, ...value });
            closeHandler();
        }

        if(value?.c_prev_previous_insurer_code){
            dataHandler({ ...vehicleDetails, ...value });
            closeHandler();
        }
    }

    const conformCloseHandler = () => {
        const exit = confirm("Are you sure you want to exit?. The changes wont be saved");
        if (exit) {
            closeHandler();
        } else {
            return;
        }
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={state}
                onClose={closeHandler}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Select Vehicle Details
                        </Typography>
                        <Button autoFocus color="inherit" onClick={conformCloseHandler}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={styles.fullscreenContentWrapper}>
                    <Vehiclemanufacturers data={vechileData} selectHandler={selectHandler} />
                </div>
            </Dialog>
        </div>
    );
}

export default FullScreenDialog;



const Vehiclemanufacturers = ({ data = [], selectHandler }) => {

    return (
        <div className={styles.manufacture_wrapper}>
            {
                data.map((vechile, index) => {
                    if (vechile?.c_make_code) {
                        return <Button onClick={e => selectHandler(vechile)} key={index} variant="outlined">{vechile.c_make}</Button>
                    }
                    if (vechile?.c_model_code) {
                        return <Button onClick={e => selectHandler(vechile)} key={index} variant="outlined">{vechile.c_model}</Button>
                    }
                    if (vechile?.c_variant_code) {
                        return <Button onClick={e => selectHandler(vechile)} key={index} variant="outlined">{vechile.c_variant}</Button>
                    }
                    if (vechile?.c_rto_state_code) {
                        return <Button onClick={e => selectHandler(vechile)} key={index} variant="outlined">{vechile.c_rto_state}</Button>
                    }
                    if (vechile?.c_rto_location_code) {
                        return <Button onClick={e => selectHandler(vechile)} key={index} variant="outlined">{vechile.c_rto_location} ({vechile.c_rto_registration_code})</Button>
                    }
                    if (vechile?.c_prev_previous_insurer_code) {
                        return <Button onClick={e => selectHandler(vechile)} key={index} variant="outlined">{vechile.c_prev_previous_insurer} ({vechile.c_prev_previous_insurer_code})</Button>
                    }
                })
            }
        </div>
    )
}