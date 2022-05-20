import styled, { css } from 'styled-components';
import { Btn } from '../../refetch/styles/style';
import checked from '../images/checked.svg';

export const FilterBody = styled.form`
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  padding: 0 20px;
  z-index: 2;
  transform: translateX(-300px);
`;
export const FilterItem = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 400;
  text-align: left;
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;
export const ItemTitle = styled.div`
  margin-bottom: 15px;
`;
export const Title = styled(FilterItem)`
  border-bottom: 2px solid grey;
  font-weight: 700;
`;
export const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 18px;
  padding: 5px;

  &:focus {
    background: none;
    outline-color: #f4511e;
  }
`;

export const Label = styled.label`
  padding-left: 25px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% - 8px);
    width: 14px;
    height: 14px;
    border: 1px solid black;
    border-radius: 50%;
  }
`;

export const Checkbox = styled.input`
  display: none;

  &:checked + ${Label}:before {
    content: '';
    position: absolute;
    left: 3px;
    top: 6px;
    width: 10px;
    height: 10px;
    background-color: #f31702;
    border-radius: 50%;
  }
`;
export const CheckboxItem = styled.div`
  display: flex;
  font-size: 18px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;
export const SubmitBtn = styled(Btn)`
  width: 125px;
  height: 35px;
`;
export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 34px;
`;
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
export const SwitchItem = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background: #f4511e;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  }
  &:checked + ${Slider}:before {
    transform: translateX(36px);
  }
`;
export const ButtonsBlock = styled(FilterItem)`
  align-items: center;
`;
export const SwitchBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const SwitchTitle = styled.div`
  font-size: 17px;
  width: 121px;
`;
export const Blur = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #6d2c178c;
  backdrop-filter: blur(8px);
  z-index: 2;
  opacity: 0;
`;
export const ResetBtn = styled.button`
  width: 125px;
  height: 35px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  span {
    width: 100%;
    border-bottom: 1px solid black;
  }

  &:hover {
    color: #f4511e;

    span {
      border-bottom: 1px solid #f4511e;
    }
  }
`;
