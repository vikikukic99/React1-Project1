import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const NameContainer = styled(motion.div)`
  margin: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  transition-timing-function: linear;

`;

const names = [
  "Sophia", "Jackson", "Olivia", "Liam", "Emma",
  "Noah", "Ava", "Lucas", "Isabella", "Oliver",
  "Mia", "Ethan", "Amelia", "Aiden", "Harper",
  "Elijah", "Evelyn", "James", "Charlotte", "Benjamin",
  "Abigail", "William", "Emily", "Alexander", "Madison",
  "Michael", "Elizabeth", "Mason", "Sofia", "Logan",
  "Avery", "Matthew", "Ella", "Daniel", "Scarlett",
  "Henry", "Grace", "Joseph", "Lily", "Samuel",
  "Chloe", "David", "Victoria", "Carter", "Riley",
  "Wyatt", "Aria", "Jayden", "Zoey", "Gabriel"
];

function NameSelector() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNames, setSelectedNames] = useState([]);
  const [maybeNames, setMaybeNames] = useState([]);

  const handleResponse = (response) => {
    const name = names[currentIndex];
    if (response === 'yes') {
      setSelectedNames(prev => [...prev, name]);
    } else if (response === 'maybe') {
      maybeNames.push(name);
    }
    // Move to the next name, considering maybe names as well
    setCurrentIndex(prev => (prev + 1) % names.length);
  };

  // Re-introducing maybe names when list ends
  useEffect(() => {
    if (currentIndex === names.length - 1) {
      names.push(...maybeNames);
      setMaybeNames([]);
    }
  }, [currentIndex, maybeNames]);

  return (
    <Container>
      <NameContainer
        key={names[currentIndex]}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {names[currentIndex]}
      </NameContainer>
      <ButtonContainer>
        <Button onClick={() => handleResponse('yes')}>Yes</Button>
        <Button onClick={() => handleResponse('no')}>No</Button>
        <Button onClick={() => handleResponse('maybe')}>Maybe</Button>
      </ButtonContainer>
      <div className='selected-names'>
        Selected names: {selectedNames.join(', ')}
      </div>
    </Container>
  );
}

export default NameSelector;
