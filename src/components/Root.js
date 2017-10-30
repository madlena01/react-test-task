import React, { Component } from 'react';
import Main from './Main/Main';
import HeaderNav from './Header/Header';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';

const Header = withRouter( props => <HeaderNav {...props}/>);

class Root extends Component {
    render() {
        return (
           <Layout className="layout">
               <Header />
               <Main/>
           </Layout>
        );
    }
}

export default Root;
