import {useSelector} from 'react-redux';
import {clearUser, selectUserCode} from "@/ducks/user";
import {useAppDispatch} from "@/app/configureStore";
import {getUserInfo} from "@/ducks/user/actions";
import ApprovalContent from "@/components/user-info/ApprovalContent.tsx";

export default function ApprovalPage() {
    const dispatch = useAppDispatch();
    const code = useSelector(selectUserCode);


    const loginHandler = (code:string) => {
        dispatch(getUserInfo({code}));
    }

    const cancelHandler = () => {
        dispatch(clearUser());
    }

    return (
        <ApprovalContent onLogin={loginHandler} onCancel={cancelHandler} code={code}/>
    );
}
