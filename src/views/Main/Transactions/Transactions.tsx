
//Redux
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTransactions, resetTransactions } from '../../../features/bank/bankSlice';
import { AppDispatch, RootState } from '../../../store';

import Datatable from '../../../components/shared-components/DataTable';
import ConnectWidget from '../../../utils/ConnectWidget';

export default function Transactions(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const { transactions, isTransactions, isTransactionsError, message } = useSelector((state: RootState) => state.bank);
    const { user } = useSelector((state: RootState) => state.auth);

    const [openAdd, setOpenAdd] = useState(false)

    const columns = [
        {id: "date", name: "Date", value: "value_date", align: 'center' as const, sort: true},
        {id: "description", name: "Description", value: "description", align: 'center' as const, sort: false},
        {id: "category", name: "Category", value: "category", align: 'center' as const, sort: true},
        {id: "amount", name: "Amount", value: "amount", align: 'center' as const, sort: true}
    ]

    useEffect(() => {

        if(!transactions.length && !isTransactions)
            fetchTransactions();
            

        if(isTransactionsError) {
            toast.error(message as string);
            dispatch(resetTransactions());
        }            

    }, [dispatch, transactions.length, transactions, isTransactionsError, message, isTransactions, user])

    const fetchTransactions = () => {
        if(user?.link)
            dispatch(getTransactions({page: 1, link: user.link}));
    }

    return(
        <>
            {
                user?.link ?
                    <>
                        <button className="btn btn-outline-primary" onClick={fetchTransactions} > Refresh </button>

                        {
                            !transactions.length &&
                                <Typography color="error" variant="caption"> If you added a bank account and you can't see transactions, click the button and wait a minute </Typography>
                        }
                        
                        <div className="d-flex flex-row" style={{overflowY: "auto", borderRadius: "1rem", maxHeight: '85vh', border: '1px solid #09203f', margin: 20}}>
                            <Datatable data={transactions} columns={columns} id={"description"} />
                        </div>

                    </>
                :
                    <button type="button" className="btn btn-outline-primary" onClick={() => setOpenAdd(true)}> Add Bank Account </button>
            }
            {
                openAdd && <ConnectWidget src="https://cdn.belvo.io/belvo-widget-1-stable.js" />
            }
            
        </>
    )
}