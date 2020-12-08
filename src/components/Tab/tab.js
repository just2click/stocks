import styled from "styled-components";

export const Tabs = styled.div`
  padding-right: 26px;
  margin-right: 26px;
  border-right: 1px solid rgb(216, 216, 216);
`;

export const Tab = styled.button`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: rgb(153, 153, 153);
  border: 0px;
  display: inline-block;
  padding: 10px 15px;

  :hover {
    background-color: white;
  }
`;

export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;
