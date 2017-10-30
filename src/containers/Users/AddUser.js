import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/index';
import { allUsers } from  '../../selectors/users';
import { Input, Button, Alert } from 'antd';
import { UserField, UserFieldLabel, UserFieldsContainer, ButtonsContainer, PageContainer, RequiredLabel, ErrorAlert } from '../../components/Globals/Blocks';


const mapStateToProps = (state) => ({
    allUsers: allUsers(state),
});

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            userEmail: null,
            userPhone: null,
            success: false,
            nameMaxLength: 100,
            errors : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.allUsers.length > this.props.allUsers.length) {
            this.setState({
                success: true
            });
            setTimeout(function () {
                nextProps.history.push(`/`);
            }, 2000);
        }
    }

    handleFieldChange(event, field) {
        const val = event.target.value;
        let setUser = {};
        switch(field) {
            case 'name':
                setUser.userName = val;
                break;
            case 'email':
                setUser.userEmail = val;
                break;
            case 'phone':
                setUser.userPhone = val;
                break;
            default:
        }
        this.setState(setUser);
    }

    handleNewUser() {
        const { userName, userEmail, userPhone, errors } = this.state;
        this.validateForm();
        if(Object.keys(errors).length === 0) {
            let newUser = {
                name: userName,
                email: userEmail,
                phone: userPhone,
            };
            this.props.actions.addUser(newUser);
        }
    }

    requiredField(field) {
        if(field && field.length > 0){
            return {
                validated: true
            }
        } else {
            return {
                validated: false,
                message: "Field is required!"
            }
        }
    }

    validateName(name) {
        const newError = this.state.errors;
        let errorMessage = null;
        const reqName = this.requiredField(name);
        if(!reqName.validated) {
            errorMessage = reqName.message;
        } else if(name.length > this.state.nameMaxLength) {
            errorMessage = `The value exceeded ${this.state.nameMaxLength} symbols.`;
        }
        if(errorMessage) {
            newError.name = errorMessage;
        } else {
            delete newError.name;
        }
        this.setState({
            errors: newError
        })
    }

    validatePhone (phone) {
        const newError = this.state.errors;
        let errorMessage = null;
        const reqPhone = this.requiredField(phone);
        if(!reqPhone.validated) {
            errorMessage = reqPhone.message;
        } else {
            const re = /[0-9]{2}[-][0-9]{3}[-][0-9]{4}/;
            if(!re.test(phone)) {
                errorMessage = 'Phone number should be in xx-xxx-xxxx format!'
            }
        }
        if(errorMessage) {
            newError.phone = errorMessage;
        } else {
            delete newError.phone;
        }
        this.setState({
            errors: newError
        })
    }

    validateEmail(email) {
        const newError = this.state.errors;
        let errorMessage = null;
        const reqEmail = this.requiredField(email);
        if(!reqEmail.validated) {
            errorMessage = reqEmail.message;
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email)) {
                errorMessage = `${email} is not a valid email.`;
            }
        }
        if(errorMessage) {
            newError.email = errorMessage;
        } else {
            delete newError.email;
        }
        this.setState({
            errors: newError
        })
    }

    validateForm() {
        const { userName, userEmail, userPhone } = this.state;
        this.validateName(userName);
        this.validateEmail(userEmail);
        this.validatePhone(userPhone);
    }

    render() {
        const { errors } = this.state;
        return (
            <PageContainer>
                <h2 style={{margin:10}}>Add New Contact</h2>
                {
                    this.state.success &&
                    <Alert
                        style={{width:'40%'}}
                        message="Success!"
                        description="Contact has been successfully added."
                        type="success"
                        showIcon
                    />
                }
                <UserFieldsContainer>
                    <UserField>
                        <UserFieldLabel>
                            <RequiredLabel />
                            Name:
                        </UserFieldLabel>
                        <Input placeholder="Name" onChange={(e) => this.handleFieldChange(e,'name')} />
                        {
                            errors && errors.name &&
                            <ErrorAlert
                            error={errors.name}
                            />
                        }
                    </UserField>
                    <UserField>
                        <UserFieldLabel>
                            <RequiredLabel />
                            Email:
                        </UserFieldLabel>
                        <Input placeholder="Email" onChange={(e) => this.handleFieldChange(e,'email')} />
                        {
                            errors && errors.email &&
                            <ErrorAlert
                                error={errors.email}
                            />
                        }
                    </UserField>
                    <UserField>
                        <UserFieldLabel>
                            <RequiredLabel />
                            Phone:
                        </UserFieldLabel>
                        <Input placeholder="Phone" onChange={(e) => this.handleFieldChange(e,'phone')} />
                        {
                            errors && errors.phone &&
                            <ErrorAlert
                                error={errors.phone}
                            />
                        }
                    </UserField>
                    <ButtonsContainer>
                        <Button disabled={this.state.success} onClick={() => this.handleNewUser()} type="primary">Submit</Button>
                    </ButtonsContainer>
                </UserFieldsContainer>
            </PageContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUser);
