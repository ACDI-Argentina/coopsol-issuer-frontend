import React from 'react';
import './_style.scss';
import { Tabs } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const TabTable = () => {
  return (
    <div className="TabTableContent">
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
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
              <UnorderedListOutlined />
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
              <UnorderedListOutlined />
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
