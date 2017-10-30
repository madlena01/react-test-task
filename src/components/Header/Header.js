import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
const { Header } = Layout;


const StyledLink = styled(Link)`
  text-decoration: none !important;
  font-weight: bold;
  color: white;
`;

class HeaderNav extends Component {

    constructor(props) {
        super(props);
        let currentPage = null;
        if(props.location.pathname === '/') {
            currentPage = 'users';
        } else if(props.location.pathname === '/contacts/add') {
            currentPage = 'addUser';
        }
        this.state = {
            currentPage
        };
    }

    componentDidMount() {
        this.props.history.listen((location, action) => {
            if(location.pathname === '/') {
                this.setState({
                    currentPage: 'users'
                });
            }
        });
    }

    handleClick = (e) => {
        this.setState({
            currentPage: e.key,
        });
    };

    render() {
        return (
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[this.state.currentPage]}
                    style={{ lineHeight: '64px' }}
                    onClick={this.handleClick}
                >
                    <Menu.Item key="users">
                        <StyledLink to='/'>Contacts</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="addUser">
                        <StyledLink to='/contacts/add'>Add Contact</StyledLink>
                    </Menu.Item>
                </Menu>
            </Header>
        );






    }
}

export default HeaderNav;
