import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import ActionMenu from '~/components/ActionMenu';
import Modal from '~/components/Modal';
import Table from '~/components/Table';

export default function DeliveryProblem() {
  const [problems, setProblems] = useState();
  const [problem, setProblem] = useState();
  const [modalIsOpen, setIsOpened] = useState(false);

  async function loadProblems(data) {
    const response = await api.get('deliveries/problems');
    if (response) {
      setProblems(response.data);
    }
  }

  useEffect(() => {
    loadProblems();
  }, []);

  async function handleView(id) {
    const response = await api.get(`deliveries/${id}/problems`);
    console.tron.log(response);
    const problem = response.data;

    if (problem) {
      setIsOpened(true);
      setProblem(problem);
    }
  }

  function closeModal() {
    setIsOpened(false);
  }

  async function handleDelete(id) {
    const answer = window.confirm('Deseja realmente cancelar a encomenda?');

    if (answer) {
      const response = await api.delete(`/problem/${id}/cancel-delivery`);
      console.tron.log(response);
      loadProblems();
    }
  }

  return (
    <>
      <h1>Problemas na entrega</h1>

      <Table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems &&
            problems.map(problem => (
              <tr>
                <td>#{problem.delivery_id.toString().padStart(2, '0')}</td>
                <td>{`${problem.description.substring(0, 100)}...`}</td>
                <td>
                  <ActionMenu
                    actions={[
                      {
                        type: 'view',
                        onClick: () => handleView(problem.delivery_id),
                      },
                      {
                        type: 'delete',
                        onClick: () => handleDelete(problem.id),
                        label: 'Cancelar encomenda',
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {problem && (
        <Modal isOpen={modalIsOpen} requestClose={closeModal}>
          <div>
            <span className="title">VIZUALIZAR PROBLEMA</span>
            <br />
            <span>{problem.description}</span>
          </div>
        </Modal>
      )}
    </>
  );
}
