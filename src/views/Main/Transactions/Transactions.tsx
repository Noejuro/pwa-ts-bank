
//Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, resetTransactions } from '../../../features/bank/bankSlice';
import { AppDispatch, RootState } from '../../../store';

export default function Transactions(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const { transactions, isTransactions, isTransactionsError, message } = useSelector((state: RootState) => state.bank);
    const { user } = useSelector((state: RootState) => state.auth);

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
            {
                transactions.map(transaction => 
                    <>
                        <span>{transaction.amount}</span>
                        <br />
                    </> 
                )
            }
        </>
    )
}