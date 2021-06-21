import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { Enter } from './Enter';
import { Cola } from './Cola';
import { CreateTicket } from './CreateTicket';
import { Desk } from './Desk';
import { UiContext } from '../context/UiContext';
  

const { Sider, Content } = Layout;

//*Componente de nav y rutas
export const RouterPage = () => {

    const { occultMenu } = useContext( UiContext );

    return (
        <Router>
            <Layout style={{ height: '100vh' }}>
                <Sider 
                    collapsedWidth="0"
                    breakpoint="md"
                    hidden={ occultMenu }
                >
                    <div className="logo" />
                    {/* Menu con Links de las rutas */}
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/enter">
                                    Ingresar
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                <Link to="/cola">
                                    Cola de tickets
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UploadOutlined />}>
                                <Link to="/create">
                                    Crear Ticket
                                </Link>
                            </Menu.Item>
                        </Menu>
                </Sider>
            <Layout className="site-layout">
              <Content
                className="site-layout-background"
                style={{
                  height: '100vh',  
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                  {/*Compnentes de las rutas */}
                <Switch>
                    <Route exact path="/enter" component={ Enter }/>
                    <Route exact path="/cola" component={ Cola }/>
                    <Route exact path="/create" component={ CreateTicket }/>
                    <Route exact path="/desk" component={ Desk }/>

                    <Redirect to="/enter" />
                </Switch>

              </Content>
            </Layout>
           </Layout>    
        </Router>
    )
}
