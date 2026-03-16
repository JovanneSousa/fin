import styled from "styled-components";

export const ContainerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  margin: 0 auto;

  p {
    margin-top: 40px;
    color: ${({ theme }) => theme.gray};
  }
`;
