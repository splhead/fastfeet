import React, { useState, useEffect, useCallback } from 'react';
import api from '~/services/api';

import Table from '~/components/Table';
import DeliveryProblem from '~/pages/DeliveryProblems/DeliveryProblem';
import HeaderContainer from '~/components/HeaderContainer';
import Pagination from '~/components/Pagination';
import EmptyData from '~/components/EmptyData';

const ITENS_PER_PAGE = process.env.REACT_APP_ITENS_TO_SHOW;

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  const loadProblems = useCallback(async pag => {
    const page = pag ? pag : 1;
    const response = await api.get(
      `deliveries/problems?page=${page}&itens_per_page=${ITENS_PER_PAGE}`
    );
    setTotalItens(response.data.count);
    setProblems(response.data.rows);
  }, []);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  return (
    <>
      <HeaderContainer title="Problemas na entrega" />
      {problems.length > 0 ? (
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
      ) : (
        <EmptyData />
      )}
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
