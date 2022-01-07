import React from 'react';
import styled from 'styled-components/macro';
import FormContainer from '../components/shared/FormContainer';
import { ReactComponent as KadenaLogo } from '../assets/images/crypto/kadena-logo.svg';
import { Dimmer, Loader, Table, Menu, Label } from 'semantic-ui-react'
import { PactContext } from '../contexts/PactContext';
import {reduceBalance, extractDecimal} from '../utils/reduceBalance';
import { ReactComponent as CloseIcon } from '../assets/images/shared/cross.svg';
import '../styles/inputoverride.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 21px;

  width: 80px;
  svg:first-child {
    z-index: 2;
  }

  div:last-child {
    margin-left: 5px;
  }
`;

const StatsContainer = ({ data }) => {

  const pact = React.useContext(PactContext);

  React.useEffect(async () => {
    await pact.getPairList()
  }, [])
  return (
    <Container>
      <table className='poolStats-table'>
        <tr>
          <th >Name</th>
          <th >Total Reserve - 0 </th>
          <th >Total Reserve - 1</th>
          <th >Rate</th>
        </tr>
        {Object.values(pact.pairList).map(pair => (
          pair&&pair.reserves ?
          <tr key={pair.name}>
            <td className='pairName'>
              <IconsContainer style={{ width:30 }}>
                {pact.tokenData[pair.token0].icon}
                {pact.tokenData[pair.token1].icon}
              </IconsContainer>
              <span >{`${pair.token0}/${pair.token1}`}</span>
            </td>
            <td >{reduceBalance(pair.reserves[0])}</td>
            <td >{reduceBalance(pair.reserves[1])}</td>
            <td >{`${reduceBalance(extractDecimal(pair.reserves[0])/extractDecimal(pair.reserves[1]))} ${pair.token0}`}</td>
          </tr>
          :""
        ))}
      </table>
    </Container>
  );
};

export default StatsContainer;
