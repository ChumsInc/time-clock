import React from 'react';
import {Nav, NavProps} from "react-bootstrap";
import {TabDetail} from "@/components/nav/types";
import NavLinkTitle from "@/components/nav/NavLinkTitle";


const tcTabs: TabDetail[] = [
    {id: 'clock', title: 'Clock In/Out', icon: 'bi-clock-fill'},
    {id: 'login', title: 'Info', icon: 'bi-person-fill'},
    {id: 'approve', title: 'Approve', icon: 'bi-hand-thumbs-up-fill'},
]



const TabBar = ({activeKey, onSelect, ...rest }:NavProps) => {
    return (
        <Nav fill activeKey={activeKey ?? 'clock'} onSelect={onSelect} variant="tabs" {...rest}>
            {tcTabs.map(tab => (
                <Nav.Item key={tab.id}>
                    <Nav.Link eventKey={tab.id}>
                        <NavLinkTitle tab={tab}/>
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
}
export default TabBar;
