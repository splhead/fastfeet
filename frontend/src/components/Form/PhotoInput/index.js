import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import { Container, Content } from './styles';

export default function PhotoInput({ name, ...rest }) {
  const photoInputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback(e => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: photoInputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <Content htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Avatar" />
        ) : (
          <>
            <MdInsertPhoto size={40} color="#ddd" />
            <strong>Adicionar foto</strong>
          </>
        )}
        <input
          id="avatar"
          type="file"
          ref={photoInputRef}
          accept="image/*"
          onChange={handlePreview}
          {...rest}
        />
      </Content>
    </Container>
  );
}

PhotoInput.propTypes = {
  name: PropTypes.string.isRequired,
};
