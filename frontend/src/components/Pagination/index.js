import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Button } from './styles';

export default function Pagination({ loadItens, totalItens, itensPerPage }) {
  const totalPages =
    totalItens % itensPerPage === 0
      ? totalItens / itensPerPage
      : Math.floor(totalItens / itensPerPage + 1);
  const [page, setPage] = useState(1);

  function previousPage() {
    if (page > 1) setPage(page - 1);
    loadItens(page - 1);
  }

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
    loadItens(page + 1);
  }

  return (
    <Container>
      <Button
        disabled={page === 1}
        action={previousPage}
        Icon={MdChevronLeft}
      />
      <span>{`${page} / ${totalPages}`}</span>
      <Button
        disabled={page === totalPages}
        action={nextPage}
        Icon={MdChevronRight}
      />
    </Container>
  );
}

Pagination.propTypes = {
  loadItens: PropTypes.func.isRequired,
  totalItens: PropTypes.number.isRequired,
  itensPerPage: PropTypes.number.isRequired,
};
