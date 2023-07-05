import React from 'react';
import BlockButton from "../../components/BlockButton";
import {clearUserAction, loadUserInfo, selectUserLoading} from "./index";
import {useSelector} from "react-redux";
import {SpinnerButton} from "chums-components";
import classNames from "classnames";
import {useAppDispatch} from "../../app/configureStore";

const UserDoneButtons: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectUserLoading);

    return (
        <div className="row g-3">
            <div className="col">
                <BlockButton onClick={() => dispatch(clearUserAction())}>Done</BlockButton>
            </div>
            <div className="col">
                <div className={classNames("d-grid col-9 mx-auto tc__done-button")}>
                    <SpinnerButton spinning={loading} color="secondary" onClick={() => dispatch(loadUserInfo(0))}>
                        Reload
                    </SpinnerButton>
                </div>
            </div>
        </div>

    )
}
export default UserDoneButtons;
