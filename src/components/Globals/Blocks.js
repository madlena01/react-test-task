import styled from 'styled-components';
import React from 'react';
import { Alert } from 'antd';


const ErrorAlertBlock = styled(Alert)`
  margin-top: 5px;
`;

export const PageContainer = styled.div`
	background: rgb(255, 255, 255);
    padding: 24px;
    min-height: 280px;
    margin: 30px;
`;

export const UserField = styled.div`
	width: 40%;
    margin-bottom: 10px;
`;

export const UserFieldLabel = styled.p`
	font-weight: bold;
	margin-bottom: 5px;
`;

export const UserFieldsContainer = styled.div`
	padding: 10px;
`;

export const ButtonsContainer = styled.div`
	display: flex;
`;

export const TableManageBlock = styled.div`
	margin: 10px;
    justify-content: flex-end;
    display: flex;
`;

export const Required = styled.span`
	color: red;
`;

export function RequiredLabel() {
    return <Required>*</Required>;
}
export function ErrorAlert(props) {
    return <ErrorAlertBlock
        message={props.error}
        closable
        type="error"
    />;
}

