import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getAccessToken, associateBank, resetAssociate } from '../features/bank/bankSlice'
import { updateUser } from "../features/auth/authSlice";

interface EventCallback {
    eventName: "ERROR" | "WARNING",
    request_id: string,
    meta_data: {
        error_code?: string,
        error_message?: string,
        warning_code?: string,
        warning_message?: string,
        institution_name: string,
        timestamp: string
    }
}

interface ExitCallback {
    last_encountered_error: {
        message: string,
        code: string
    },
    meta_data: {
        institution_name: string,
        step: string
    }
}

function ConnectWidget(src: string) {

    const dispatch = useDispatch<AppDispatch>();
    const { access, isAssociated } = useSelector((state: RootState) => state.bank);

    useEffect(() => {
        if(src !== "") {
            // Create script
            const node = document.createElement('script');
            node.src = src;
            node.type = 'text/javascript';
            node.async = true;
            node.onload = createWidget
            // Add script to document body
            document.body.appendChild(node);
        }
    }, [src])

    useEffect( () => {
        if(access && access !== '') {
            const successCallbackFunction = (link: string, institution: string) => {
                // Do something with the link and institution,
                dispatch(associateBank({link, institution}));
            }
            const onExitCallbackFunction = (data: ExitCallback) => {
                // Do something with the exit data.
            }
            const onEventCallbackFunction = (data: EventCallback) => {
                // Do something with the exit data.
            }
            const config = {
                callback: (link: string, institution: string) => successCallbackFunction(link, institution),
                onExit: (data: ExitCallback) => onExitCallbackFunction(data),
                onEvent: (data: EventCallback) => onEventCallbackFunction(data)
            }
            window.belvoSDK.createWidget(access, config).build()
        }
    }, [access])

    useEffect(() => {
        if(isAssociated) {
            dispatch(resetAssociate());
            dispatch(updateUser());
        }
    }, [isAssociated])

    const createWidget = () => {
        // Function to call your server-side to generate the access_token and retrieve the your access token
        dispatch(getAccessToken());
    }
}



  export default ConnectWidget;