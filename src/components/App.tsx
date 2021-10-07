import React from 'react';
import {useSelector} from 'react-redux';
import TabBar, {tabId} from "./TabBar";
import ClockPage from "./ClockPage";
import UserInfoPage from "../ducks/user/UserInfoPage";
import ApprovalPage from "../ducks/user/ApprovalPage";
import AppVersion from "../ducks/version/AppVersion";
import {AlertList, ErrorBoundary, selectCurrentTab} from "chums-ducks";

const App: React.FC = () => {
    const tab = useSelector(selectCurrentTab(tabId));
    return (
        <div className="container tc__container">
            <TabBar/>
            <AlertList/>
            <ErrorBoundary>
                {tab === 'clock' && (<ClockPage/>)}
                {tab === 'login' && (<UserInfoPage/>)}
                {tab === 'approve' && (<ApprovalPage/>)}
            </ErrorBoundary>
            <footer>
                <AppVersion/>
            </footer>
        </div>
    );
}
export default App;
