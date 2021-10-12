import React, {useState} from 'react'; 
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Data } from './Data';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, SettingFilled,LogoutOutlined } from '@ant-design/icons';


const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display:flex;
    justify-content: flex-start;
    align-items: center;
`
const RightNav = styled.div`
    display:flex;
    width: 50%;
    justify-content: flex-end;
    align-items: center;
`

const LeftNav = styled.div`
    display:flex;
    width: 50%;
    justify-content: flex-start;
    align-items: center;
`
const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display:flex;
    justify-content: flex-start;
    align-items: center;
`
const NavIconRight = styled.div`
    padding-right: 2rem;
    display: flex;
    font-size: 2rem;
    height: 80px;
    align-items:center; 
`
const SidebarNav = styled.nav`
    background: #15171c;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10; 
`

const SidebarWrap = styled.div`
    width:100%;
`
function Sidebar(){
    const [sidebar, setSidebar] = useState(false);
    let history = useHistory();
    const showSidebar = () => setSidebar(!sidebar);

    const onClick = () =>{
        localStorage.clear();
        history.push('/login');
    }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <Link to="/profile"><SettingFilled /> User settings</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/updatePass"><SettingFilled /> Change password</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="#" onClick = {onClick}><LogoutOutlined /> LogOut</Link>
          </Menu.Item>
        </Menu>
    );

    return(
        <>
            <IconContext.Provider value = {{color: '#fff'}}>
                <Nav>
                    <LeftNav>
                        <NavIcon to="#">
                            <FaIcons.FaBars onClick = {showSidebar}/>
                        </NavIcon>
                    </LeftNav>
                    <RightNav>
                        <NavIconRight to="#">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Link to ="#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Link>
                            </Dropdown>
                        </NavIconRight>
                    </RightNav>
                    
                </Nav>
                <SidebarNav to="#" sidebar = {sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose  onClick = {showSidebar}/>
                        </NavIcon>
                        {Data.map((item, index)=>{
                            return <SubMenu item={item} key= {index} ></SubMenu>
                        })}
                    </SidebarWrap>

                </SidebarNav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;