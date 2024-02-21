import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';


// Container for the whole app
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: #f0f4f8;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Animations for name transitions
const NameContainer = styled(motion.div)`
  margin: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #2a9d8f;
  background-color: #e9f5f2;
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

// Styling for button container
const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

// Button styling for Yes, No, Maybe options
const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #264653;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2a9d8f;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
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
    
    setCurrentIndex(prev => (prev + 1) % names.length);
  };

  
  useEffect(() => {
    if (currentIndex === names.length - 1) {
      names.push(...maybeNames);
      setMaybeNames([]);
    }
  }, [currentIndex, maybeNames]);

  return (
    <Container>
        <div className='selected-names'>Find perfect name for your puppy</div>
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
