import styled from 'styled-components';
import Department from '../components/Recruit/Department';
import Question from '../components/Recruit/Qustion';
import Content from '../components/Recruit/Content';
import theme from '../theme';
import Notification from '../components/Recruit/Notification';

const Title = styled.h1`
  font-family: 'Goblin One';
  font-size: 1.875rem;
  text-align: center;
  padding: 2rem 0;
  font-weight: 300;
`;

const NotificationSection = styled.section`
  height: 55vh;
  background: linear-gradient(to bottom, #313131 60%, ${theme.colors.black} 100%);
`;

export default function RecruitPage() {
  return (
    <main>
      <NotificationSection>
        <Title>RECRUIT</Title>
        <Notification />
      </NotificationSection>
      <section
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 7.5%'}}
      >
        <Content />
        <Department />
        <Question />
      </section>
    </main>
  );
}
