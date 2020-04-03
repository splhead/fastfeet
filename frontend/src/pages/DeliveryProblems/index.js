import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';

import Table from '~/components/Table';
import DeliveryProblem from '~/pages/DeliveryProblems/DeliveryProblem';
import HeaderContainer from '~/components/HeaderContainer';
import Pagination from '~/components/Pagination';

const ITENS_PER_PAGE = 3;

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  const loadProblems = useCallback(async page => {
    const response = await api.get(
      `deliveries/problems?page=${page}&itens_per_page=${ITENS_PER_PAGE}`
    );
    setTotalItens(response.data.count);
    setProblems(response.data.rows);
  }, []);

  useEffect(() => {
    loadProblems(1);
  }, [loadProblems]);

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
      {totalItens > ITENS_PER_PAGE && (
        <Pagination
          loadItens={loadProblems}
          totalItens={totalItens}
          itensPerPage={ITENS_PER_PAGE}
        />
      )}
    </>
  );
}
