import React, { useContext, useState } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';
import { Redirect, useHistory } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const Desk = () => {

    useHideMenu(false);
    const history = useHistory();
    const [ user ] = useState( getUserStorage() );
    const [ ticket, setTicket ] = useState( null );
    const { socket } = useContext( SocketContext );

    //Funcion para salir
    const leave = () => {
        localStorage.clear();
        history.replace('/enter');
    }

    //Funcion para solicitar siguiente ticket
    const nextTicket = () => {
        socket.emit('next-ticket-work', user, (ticket) => {
            setTicket( ticket );
        });
    }

    if( !user.agent || !user.desk ){
        return <Redirect to="/enter" />
    }
    

    return (
        <>
            <Row>
                <Col span={ 20 }>
                    <Title level={ 2 }>{ user.agent }</Title>
                    <Text> Usted esta trabajando en el escritorio: </Text>
                    <Text type="success">{ user.desk }</Text>
                </Col>

                <Col span={ 4 } align="right">
                    <Button
                        shape="round"
                        type="danger"
                        onClick={ leave }
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>

            </Row>

            <Divider />

            {
                ticket && (
                    <Row>
                        <Col>
                            <Text>Esta atendiendo el ticket numero: </Text>
                            <Text 
                                style={{ fontSize:30 }} 
                                type="danger"
                            >
                            { ticket.number }
                            </Text>
                        </Col>
                    </Row>
                )
            }


            <Row>
                <Col offset={ 18 } span={ 6 } align="right">
                    <Button
                        onClick={ nextTicket }
                        shape="round"
                        type="primary"
                    >   
                        <RightOutlined />
                        Siguiente
                    </Button>

                </Col>
            </Row>
        </>
    )
}
