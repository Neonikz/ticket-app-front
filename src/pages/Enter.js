import React, { useState } from 'react';

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useHistory, Redirect } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';

const { Title, Text } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 14 },
  };

export const Enter = () => {

    //Hook para ocultar el menu o mostrarlo
    useHideMenu(false);

    const history = useHistory();
    const [ user ] = useState( getUserStorage() );


    //*Funcion cuando todo sale bien con el form
    const onFinish = ({ agent, desk }) => {

        localStorage.setItem('agent', agent );
        localStorage.setItem('desk', desk );

        history.push('/desk')
    };
    
    
    //!Funcion cuando todo sale mal con el form
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    if( user.agent && user.desk ){
        return <Redirect to="/desk" />
    }

    return (
        <>
            <Title level={ 2 }> Ingresar </Title>
            <Text> Ingrese su nombre y numero de escritorio </Text>
            <Divider />
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre del agente"
                    name="agent"
                    rules={[{ required: true, message: 'Por favor, ingrese su nombre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="desk"
                    rules={[{ required: true, message: 'Por favor, ingrese el numero de escritorio!' }]}
                >
                    <InputNumber min={ 1 } max={ 99 } />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        shape="round"
                    >
                        <SaveOutlined />
                    Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
