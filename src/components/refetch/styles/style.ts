import styled from 'styled-components';

export const BlockWrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  border-radius: 10px;
  margin-bottom: 80px;
`;
export const SadPic = styled.div`
  width: 200px;
  height: 200px;
`;
export const SadText = styled.div`
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
`;
export const BtnBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
export const Btn = styled.button`
  font-family: 'Roboto', sans-serif;
  width: 140px;
  height: 50px;
  cursor: pointer;
  font-size: 16px;
  border: 2px solid #f4511e;
  border-radius: 40px;
  background: white;
  outline: none;

  &:hover {
    background: linear-gradient(to bottom, #fff176, #e91e63);
    color: white;
    border: none;
    font-weight: 700;
  }
`;
export const LeftBtn = styled(Btn)``;
export const RightBtn = styled(Btn)``;
