import React, { useEffect, useState } from 'react';

import { MdVisibility, MdModeEdit, MdDelete } from 'react-icons/md';

import { Container } from './styles';

export default function Action({ type, onClick, label }) {
  const [viewIconIsVisible, setViewIconIsVisible] = useState(false);
  const [editIconIsVisible, setEditIconIsVisible] = useState(false);
  const [deleteIconIsVisible, setDeleteIconIsVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    switch (type) {
      case 'view': {
        setViewIconIsVisible(true);
        if (label) {
          setText(label);
        } else {
          setText('Visualizar');
        }
        break;
      }
      case 'edit': {
        setEditIconIsVisible(true);
        if (label) {
          setText(label);
        } else {
          setText('Editar');
        }
        break;
      }
      case 'delete': {
        setDeleteIconIsVisible(true);
        if (label) {
          setText(label);
        } else {
          setText('Excluir');
        }
        break;
      }
      default:
    }
  }, [label, type]);

  function handleClick() {
    if (!onClick) return;
    onClick();
  }

  return (
    <Container onClick={handleClick}>
      {viewIconIsVisible && <MdVisibility size={20} color="#8E5BE8" />}
      {editIconIsVisible && <MdModeEdit size={20} color="#4D85EE" />}
      {deleteIconIsVisible && <MdDelete size={20} color="#DE3B3B" />}
      <span>{text}</span>
    </Container>
  );
}
