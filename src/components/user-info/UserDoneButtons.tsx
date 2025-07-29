import {clearUser, selectUserLoading} from "@/ducks/user";
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {getUserInfo} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";
import {ClockButtons} from "@/components/common/ClockButtons";

const UserDoneButtons = ({code, idPayPeriod}: { code: string, idPayPeriod?: number }) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectUserLoading);

    const doneHandler = () => {
        dispatch(clearUser());
    }
    const reloadHandler = () => {
        dispatch(getUserInfo({code, idPayPeriod}));
    }

    return (
        <ClockButtons>
            <Button type="button" variant="primary" onClick={doneHandler}>
                <span>Done</span><span className="bi-check"/>
            </Button>
            <Button variant="secondary" onClick={reloadHandler} disabled={loading}>
                <span>Reload</span><span className="bi-arrow-clockwise"/>
            </Button>
        </ClockButtons>

    )
}
export default UserDoneButtons;
