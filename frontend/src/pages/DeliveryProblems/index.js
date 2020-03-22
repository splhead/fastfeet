import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import Table from '~/components/Table';
import DeliveryProblem from '~/pages/DeliveryProblems/DeliveryProblem';
import HeaderContainer from '~/components/HeaderContainer';

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('deliveries/problems');
      setProblems(response.data);
    }
    loadProblems();
  }, []);

  return (
    <>
      <HeaderContainer title="Problemas na entrega" />
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
              <tr key={problem.id}>
                <DeliveryProblem problem={problem} />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
