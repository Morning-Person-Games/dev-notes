import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { staticSizes, baseTypes, mixins } from "../../styles/globalStyles";

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  ${mixins.transition("all", (props) => (props.fade ? props.fade : 300))}
  background: rgba(0, 0, 0, ${(props) =>
    props.transparency ? props.transparency : 0.5});
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
  ${(props) => (props.fade && props.fade > 0 ? "none" : "block")};
  position: relative;
  width: 95%;
  max-width: calc(${(props) => props.theme.sizes.mdCol} + 40px);
  height: auto;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 3001;
  border: 0;
  border-radius: ${staticSizes.radius};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 0;
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Escape = styled.button`
  padding: 10px;
  font-size: ${staticSizes.font.xl};
  background: none;
  color: ${(props) => props.theme.colors.white};
  ${baseTypes.hover} {
    background: none;
    color: ${(props) => props.theme.colors.highlightHover};
  }
`;

const Body = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  border: 0;
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
`;

const Title = styled.h2`
  margin: 0;
  padding: 10px 10px 10px 46px;
  width: 100%;
  text-align: center;
`;

function Modal({ modalContent, setModalContent }) {
  const fade = modalContent && modalContent.fade ? modalContent.fade : "0";
  useEffect(() => {
    if (modalContent !== null) {
      const close = (e) => {
        if (e.key === "Escape" && !fade) {
          setModalContent(null);
        }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [modalContent, setModalContent, fade]);

  if (modalContent === null) {
    return;
  }
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

export default Modal;
