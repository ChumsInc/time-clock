import React from 'react';
import UserInfoPage from "@/components/user-info/UserInfoPage";
import ApprovalPage from "@/components/user-info/ApprovalPage";
import AppVersion from "../ducks/version/AppVersion";
import AppAlertsList from "@/app/AppAlertsList";
import TabBar from "@/components/nav/TabBar";
import ClockPage from "@/components/clock-action/ClockPage";

const App: React.FC = () => {
    const [tab, setTab] = React.useState<string | null>('clock');

    return (
        <div className="container tc__container">
            <TabBar activeKey={tab ?? 'clock'} onSelect={setTab}/>
            <AppAlertsList/>
            {tab === 'clock' && (<ClockPage/>)}
            {tab === 'login' && (<UserInfoPage/>)}
            {tab === 'approve' && (<ApprovalPage/>)}
            <footer>
                <AppVersion/>
            </footer>
        </div>
    );
}
export default App;
