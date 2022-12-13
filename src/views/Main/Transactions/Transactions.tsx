
//Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datatable from '../../../components/shared-components/DataTable';
import { getTransactions, resetTransactions } from '../../../features/bank/bankSlice';
import { AppDispatch, RootState } from '../../../store';

export default function Transactions(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const { transactions, isTransactions, isTransactionsError, message } = useSelector((state: RootState) => state.bank);
    const { user } = useSelector((state: RootState) => state.auth);

    const columns = [
        {id: "date", name: "Date", value: "value_date", align: 'center' as const, sort: true},
        {id: "description", name: "Description", value: "description", align: 'center' as const, sort: false},
        {id: "category", name: "Category", value: "category", align: 'center' as const, sort: true},
        {id: "amount", name: "Amount", value: "amount", align: 'center' as const, sort: true}
    ]

    useEffect(() => {

        if(!transactions.length && !isTransactions)
            if(user?.link)
                dispatch(getTransactions({page: 1, link: user.link}));
            

        if(isTransactionsError) {
            // toast.error(message as string);
            dispatch(resetTransactions());
        }            

    }, [dispatch, transactions.length, transactions, isTransactionsError, message, isTransactions])

    return(
        <>
            <div className="d-flex flex-row" style={{overflowY: "auto", borderRadius: "1rem", maxHeight: '95vh', border: '1px solid #09203f', margin: 20}}>
                <Datatable data={transactions} columns={columns} id={"description"} />
            </div>
        </>
    )
}