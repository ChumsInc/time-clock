import Nav, {type NavProps} from "react-bootstrap/Nav";
import type {TabDetail} from "@/components/nav/types";
import NavLinkTitle from "@/components/nav/NavLinkTitle";


const tcTabs: TabDetail[] = [
    {id: 'clock', title: 'Clock In/Out', icon: 'bi-clock-fill'},
    {id: 'login', title: 'Info', icon: 'bi-person-fill'},
    {id: 'approve', title: 'Approve', icon: 'bi-hand-thumbs-up-fill'},
]


export default function TabBar({activeKey, onSelect, ...rest}: NavProps) {
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
