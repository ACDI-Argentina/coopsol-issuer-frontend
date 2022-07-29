import React, { useContext, useState } from 'react';
import NavBar from '../NavBar/navbar';
import './_style.scss';
import '../../../css/app.scss';
import styled from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { AppContext } from 'services/providers/app-context';

const Wrapper = styled.div`
  position: relative;
`
/* Ajustar al contenido */

const CollapseButton = styled.div`
  width: 18px;
  height: 45px;
  box-sizing: border-box;
  z-index: 1000;
  position: absolute;
  top: 15px;
  right: -18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffcd33;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`


const Header = () => {
  const {menuCollapsed, setMenuCollapsed} = useContext(AppContext);
  

  return (
    <Wrapper className={`wrapper ${menuCollapsed?'collapsed':''}`}>
      <CollapseButton
        onClick={() => setMenuCollapsed(prev => !prev)}
      >
        {menuCollapsed ? <CaretRightOutlined color='#3d3737' />  : <CaretLeftOutlined color='#3d3737' />}
      </CollapseButton>

      <div className={`header ${menuCollapsed?'collapsed':''}`}>
        <div className="TopNav">
          <img src="img/sem-logo.png" alt="" />
        </div>
        <NavBar />
      </div>
    </Wrapper>
  );
};

export default Header;
