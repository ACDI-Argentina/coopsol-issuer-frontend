import React from 'react';
import './_style.scss';
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const TabTable = () => {
  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Credenciales vigentes
            </span>
          }
          key="1"
        >
          Tab 1
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Credenciales provisorias
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Pendientes de aprobación crediticia
            </span>
          }
          key="3"
        >
          Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
