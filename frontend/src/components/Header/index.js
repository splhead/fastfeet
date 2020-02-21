import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, LogoMenuContainer, Content, Bar, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <LogoMenuContainer>
          <img src={logo} alt="FastFeet" />
          <Bar />
          <nav>
            <NavLink to="/delivery" activeClassName="selected" exact>
              ENCOMENDAS
            </NavLink>
            <NavLink to="/deliveryman" activeClassName="selected" exact>
              ENTREGADORES
            </NavLink>
            <NavLink to="/recipient" activeClassName="selected" exact>
              DESTINATÁRIOS
            </NavLink>
            <NavLink to="/problem" activeClassName="selected" exact>
              PROBLEMAS
            </NavLink>
          </nav>
        </LogoMenuContainer>

        <aside>
          <Profile>
            <span>{profile.name}</span>
            <a href="/" onClick={handleLogout}>
              sair do sistema
            </a>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
