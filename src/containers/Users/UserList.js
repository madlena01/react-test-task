import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/index';
import { allUsers } from  '../../selectors/users';
import { Table, Button, Input } from 'antd';
import { TableManageBlock, PageContainer } from '../../components/Globals/Blocks';

const mapStateToProps = (state) => ({
    allUsers: allUsers(state),
});

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedUser: null,
            users: this.props.allUsers
        };
    }

    handleDeleteUser = (id) => {
        this.props.actions.removeUser(id);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            users: nextProps.allUsers
        });
    }

    handleSearch(e) {
        let searchedUser = e.target.value;
        if(searchedUser.length > 0){
            this.setState({
                searchedUser
            });
        } else {
            this.setState({
                users: this.props.allUsers
            });
        }
    }

    handleSearchSubmit() {
        const { searchedUser, users } = this.state;
        if(searchedUser && searchedUser.length > 0) {
            let foundedUsers = users.filter(user => {
                return user.name.toLowerCase().indexOf(searchedUser.toLowerCase()) !== -1 || user.phone.indexOf(searchedUser) !== -1;
            });
            this.setState({
                users: foundedUsers
            });
        }
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Action',
                dataIndex: 'id',
                key: 'id',
                render: id => <Button onClick={() => this.handleDeleteUser(id)} type="danger">Delete</Button>,
            }
        ];

        return (
           <PageContainer>
               <h2 style={{margin:10}}>All Contacts</h2>
               <TableManageBlock>
                   <div style={{display:'flex'}}>
                       <Input style={{width:200}} placeholder="Search user..." onChange={(e)=> this.handleSearch(e)} />
                       <Button type="primary" style={{marginLeft: 10}} shape="circle" icon="search" onClick={()=> this.handleSearchSubmit()} />
                   </div>
               </TableManageBlock>
               <Table
                   rowKey={record => record.id}
                   style={{margin: '30px 10px'}}
                   columns={columns}
                   dataSource={this.state.users}
               />
           </PageContainer>
        );
    }
}

const UserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default UserList;
