import React from 'react';
import UserInfoPage from "@/components/user-info/UserInfoPage";
import ApprovalPage from "@/components/user-info/ApprovalPage";
import AppVersion from "../ducks/version/AppVersion";
import AppAlertsList from "@/app/AppAlertsList";
import TabBar from "@/components/nav/TabBar";
import ClockActionPage from "@/components/clock-action/ClockActionPage.tsx";
import PageContainer from "@/components/common/PageContainer.tsx";

export default function App() {
    const [tab, setTab] = React.useState<string | null>('clock');

    return (
        <div className="container tc__container">
            <TabBar activeKey={tab ?? 'clock'} onSelect={setTab}/>
            <AppAlertsList/>
            <PageContainer>
                {tab === 'clock' && (<ClockActionPage/>)}
                {tab === 'login' && (<UserInfoPage/>)}
                {tab === 'approve' && (<ApprovalPage/>)}
            </PageContainer>
            <footer>
                <AppVersion/>
            </footer>
        </div>
    );
}
