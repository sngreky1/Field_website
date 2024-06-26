import styled from 'styled-components';
import TextGenerator from '../TextGenerator';

const MainSection = styled.section`
  margin: 0 7.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H3 = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  margin: ${props => props.$margin || '0'};
`;

const NanumH3 = styled(H3)`
  font-family: 'Nanum Myeongjo', serif;
  font-weight: 700;
  gap: 2rem;
  font-size: 1.625rem;
  margin: 10rem 0 5rem 0;
`;

const Image = styled.img`
  margin: ${props => props.$margin || '0'};
  width: ${props => props.width || ''};
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${props => props.radius || ''};
`;

function IntroSection() {
  return (
    <MainSection>
      <TextGenerator text='OUR GOAL' />
      <NanumH3>
        <span>꿈과 비전, 생각을 공유하는</span>
        <span>교류의 장을 만든다</span>
      </NanumH3>
      <Image width='140px' src='fieldLogo.png' alt='필드 로고' $margin='10rem 0 10rem 0' />
    </MainSection>
  );
}

export default IntroSection;
