/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent } from 'react';

import { Container, InputStyle } from './styles';

type TInput = {
  onChange: Function;
  value: string | number;
  placeholder?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name: string;
};

const Input: React.FC<TInput> = ({
  onChange,
  value,
  placeholder,
  type,
  required,
  minLength,
  maxLength,
  name,
}: TInput) => {
  const handleChange = ({
    target: { value: dataValue },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(dataValue);
  };

  return (
    <Container>
      <InputStyle
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        name={name}
      />
    </Container>
  );
};

Input.defaultProps = {
  placeholder: '',
  type: 'string',
  required: false,
  minLength: undefined,
  maxLength: undefined,
};

export default Input;
