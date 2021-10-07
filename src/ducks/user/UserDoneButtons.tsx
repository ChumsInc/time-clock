import React from 'react';
import BlockButton from "../../components/BlockButton";
import {clearUserAction, getUserInfoAction, selectUserLoading} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {SpinnerButton} from "chums-ducks";
import classNames from "classnames";

const UserDoneButtons:React.FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectUserLoading);

    return (
        <div className="row g-3">
            <div className="col">
                <BlockButton onClick={() => dispatch(clearUserAction())}>Done</BlockButton>
            </div>
            <div className="col">
                <div className={classNames("d-grid col-9 mx-auto tc__done-button")}>
                    <SpinnerButton spinning={loading} color="secondary" onClick={() => dispatch(getUserInfoAction())}>
                        Reload
                    </SpinnerButton>
                </div>
            </div>
        </div>

    )
}
export default UserDoneButtons;
