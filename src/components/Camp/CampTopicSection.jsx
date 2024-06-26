import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import theme from '../../theme';
import Button from '../Button';
import {CampApi} from '../../lib/Apiservice';
import {setCampTitle} from '../../redux/campTitleSlice';
import Dropdown from '../Dropdown';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 7.5%;
  text-align: center;
  align-items: center;
  gap: 0.25rem;
`;

const H2 = styled.h2`
  margin: 6rem 7.5% 1rem 7.5%;
  font-size: 1.625rem;
  color: ${props => (props.$color ? theme.colors[props.$color] : 'white')};
  font-family: Nanum Myeongjo;
  font-weight: 900;
`;

const H3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  font-family: SUIT-Heavy;
  margin: 0 0 1rem 0;
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-item: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  border-radius: 1rem;
  order: 2;
`;

const Figcaption = styled.figcaption`
  text-align: center;
  color: ${props => (props.$color ? theme.colors[props.$color] : theme.colors.red)};
  font-family: 'Goblin One';
  font-size: 1.25rem;
`;

const ButtonWrapper = styled.div`
  margin: 0 0 1.25rem 0;
`;

function CampTopicSection() {
  const [campDataYear, setCampDataYear] = useState([]);
  const [campFullData, setCampFullData] = useState([]);
  const [showedCampData, setShowedCampData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const campYear = useSelector(state => state.campTitle.value);
  const dispatch = useDispatch();

  const imageUrl = `${import.meta.env.VITE_API_URL}/api/files/chlj2bc39fagbcf/`;

  const filterData = year => {
    setShowedCampData(campFullData.filter(camp => camp.year === year));
  };

  const localData = localStorage.getItem('fieldData');

  const getDataFieldYear = async () => {
    try {
      let response;
      if (localData) {
        response = JSON.parse(localData);
      } else {
        response = await CampApi();
        localStorage.setItem('fieldData', JSON.stringify(response));
      }
      const years = response.map(item => item.year);
      const uniqueYears = [...new Set(years)];
      const maxYear = Math.max(...uniqueYears);
      setCampFullData(response);
      setCampDataYear(uniqueYears);
      dispatch(setCampTitle(maxYear));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataFieldYear();
  }, []);

  useEffect(() => {
    if (campFullData.length > 0) {
      filterData(campYear);
    }
  }, [campYear, campFullData]);

  const toggleImageDisplay = index => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <Section>
      <H2>역대 FIELD CAMP</H2>
      <Dropdown title='역대 FIELD CAMP' titleArr={campDataYear} />
      {showedCampData.map((camp, index) => (
        <ButtonWrapper key={camp.id}>
          <Figure key={camp.id}>
            {expandedIndex === index ? (
              camp.file.map((file, fileIndex) => (
                <Img
                  key={camp.id}
                  src={`${imageUrl}${camp.id}/${file}`}
                  alt={`camp-image-${fileIndex}`}
                />
              ))
            ) : (
              <Img key={camp.id} src={`${imageUrl}${camp.id}/${camp.file[0]}`} alt='camp-image-0' />
            )}
            {camp.topic === '1st' ? (
              <Figcaption>{camp.topic} TOPIC</Figcaption>
            ) : (
              <Figcaption $color='blue'>{camp.topic} TOPIC</Figcaption>
            )}
          </Figure>
          <Button
            onClick={() => toggleImageDisplay(index)}
            label={expandedIndex === index ? '가리기' : `'주제${index + 1}'에 대해 더 알아보기`}
          />
        </ButtonWrapper>
      ))}
    </Section>
  );
}

export default CampTopicSection;
