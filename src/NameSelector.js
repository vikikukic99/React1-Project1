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


const namesList = [
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
  const [rejectedNames, setRejectedNames] = useState([]);
  const [maybeNames, setMaybeNames] = useState([]);
  const [activeNames, setActiveNames] = useState([...namesList]);

  useEffect(() => {
    // Filter out names that are either selected or rejected
    const filteredNames = namesList.filter(name => !selectedNames.includes(name) && !rejectedNames.includes(name));
    setActiveNames(filteredNames);
  }, [selectedNames, rejectedNames]);

  const handleResponse = (response, name) => {
    if (response === 'yes') {
      setSelectedNames(prev => [...prev, name]);
    } else if (response === 'no') {
      setRejectedNames(prev => [...prev, name]);
    } else if (response === 'maybe') {
      // Maybe logic remains the same, as maybeNames is not directly affecting the filtering
    }

    // Move to the next name, but ensure we cycle through activeNames
    setCurrentIndex(prev => (prev + 1) % activeNames.length);
  };

  // When activeNames changes, reset currentIndex to 0 to start from the beginning of the filtered list
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeNames]);

  return (
    <Container>
        <div className='selected-names'>Find the perfect name for your puppy</div>
        {activeNames.length > 0 ? (
          <NameContainer
            key={activeNames[currentIndex]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeNames[currentIndex]}
          </NameContainer>
        ) : (
          <div>No more names to display.</div>
        )}
      <ButtonContainer>
        <Button onClick={() => handleResponse('yes', activeNames[currentIndex])}>Yes</Button>
        <Button onClick={() => handleResponse('no', activeNames[currentIndex])}>No</Button>
        <Button onClick={() => handleResponse('maybe', activeNames[currentIndex])}>Maybe</Button>
      </ButtonContainer>
      <div className='selected-names'>
        Selected names: {selectedNames.join(', ')}
      </div>
    </Container>
  );
}

export default NameSelector;
