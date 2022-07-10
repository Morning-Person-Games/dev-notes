import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/globalStyles";

const { colors, sizes, baseTypes } = theme;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
`;

const CloseOnClick = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Main = styled.section`
  position: relative;
  width: 95%;
  max-width: calc(${sizes.mdCol} + 40px);
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3001;
  border: 0;
  border-radius: ${sizes.radius};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 0;
  border-radius: ${sizes.radius} ${sizes.radius} 0 0;
  background-color: ${colors.primary};
`;

const Escape = styled.button`
  ${baseTypes.button};
  padding: 10px;
  font-size: ${sizes.font.xl};
  background: none;
  color: ${colors.white};
  ${baseTypes.hover} {
    background: none;
    color: ${colors.highlightHover};
  }
`;

const Body = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: ${colors.secondary};
  border: 0;
  border-radius: 0 0 ${sizes.radius} ${sizes.radius};
`;

const Title = styled.h2`
  margin: 0;
  padding: 10px;
  width: 100%;
  text-align: center;
`;

function Modal({ modalContent, setModalContent }) {
  useEffect(() => {
    if (modalContent !== null) {
      const close = (e) => {
        if (e.key === "Escape") {
          setModalContent(null);
        }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [modalContent, setModalContent]);

  if (modalContent === null) {
    return;
  } else {
    return (
      <ModalDiv id="Modal">
        <CloseOnClick onClick={() => setModalContent(null)} />
        <Main>
          <Header>
            <Title>{modalContent.title}</Title>
            <Escape
              onClick={() => {
                setModalContent(null);
              }}
            >
              X
            </Escape>
          </Header>
          <Body>{modalContent.component}</Body>
        </Main>
      </ModalDiv>
    );
  }
}

export default Modal;
