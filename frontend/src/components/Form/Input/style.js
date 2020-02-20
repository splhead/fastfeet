import styled from 'styled-components';

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span.error {
    margin-top: 8px;
    text-align: left;
    color: #de3b3b;
  }
`;

export const MyInput = styled.input`
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin: 8px 0 0 0;
  padding: 0 16px;

  &::placeholder {
    color: #999;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  color: #444;
  text-align: left;
  margin-top: 16px;
`;
