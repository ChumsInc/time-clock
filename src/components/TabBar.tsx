import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Tab, TabList, tabListCreatedAction} from "chums-ducks";
import './tab-bar.scss';

export const tabId = 'tc-tabs';
const tcTabs: Tab[] = [
    {id: 'clock', title: 'Clock In/Out', icon: 'bi-clock-fill'},
    {id: 'login', title: 'Info', icon: 'bi-person-fill'},
    {id: 'approve', title: 'Approve', icon: 'bi-hand-thumbs-up-fill'},
]
const TabBar: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(tabListCreatedAction(tcTabs, tabId, 'clock'));
    })
    return (
        <TabList tabKey={tabId} className="mt-1 mb-2"/>
    );
}
export default TabBar;
