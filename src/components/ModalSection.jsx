import React, {useState} from 'react';
import styled from 'styled-components';
import modalIcon from '../assets/modalIcon.png';
import Modal from './Modal';

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin: ${props => (props.margin ? props.margin : '2rem 0 1rem 0 ')};
`;

const IconImg = styled.img`
  width: auto;
  height: auto;
`;

const H2 = styled.h2`
  font-size: ${props => (props.size ? props.size : '1.625rem')};
  color: ${props => (props.color ? theme.colors[props.color] : 'white')};
  font-family: ${props => (props.font ? props.font : '')};
  font-weight: bold;
`;

const ModalBackground = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 1;
`;

function ModalSection({title, color, font, fontSize, timeDatalst}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <IconWrapper>
      <IconImg
        src={modalIcon}
        alt='모달창 아이콘'
        onClick={() => {
          setShowModal(true);
        }}
      />
      <H2 font={font} color={color} size={fontSize}>
        {title}
      </H2>
      {showModal && (
        <ModalBackground
          onClick={() => {
            setShowModal(false);
          }}
        >
          <Modal titleData={timeDatalst} showModal={showModal} setShowModal={setShowModal} />
        </ModalBackground>
      )}
    </IconWrapper>
  );
}

export default ModalSection;
