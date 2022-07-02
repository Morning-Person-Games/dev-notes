import React, { useEffect } from "react";
import styled from "@emotion/styled";

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3000;
`;

const Main = styled.section`
  position: fixed;
  background: white;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.section`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`;

const Escape = styled.button`
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
`;

const Body = styled.div`
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
`;

const Title = styled.h5``;

function Modal(props) {
  useEffect(() => {
    if (props.modalContent !== null) {
      const close = (e) => {
        if (e.key === "Escape") {
          props.setModalContent(null);
        }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [props, props.modalContent]);

  if (props.modalContent === null) {
    return;
  } else {
    return (
      <ModalDiv id="Modal">
        <Main>
          <Header>
            <Title>{props.modalContent.title}</Title>
            <Escape
              onClick={() => {
                props.setModalContent(null);
              }}
            >
              X
            </Escape>
          </Header>
          <Body>{props.modalContent.component}</Body>
        </Main>
      </ModalDiv>
    );
  }
}

export default Modal;
