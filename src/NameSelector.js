import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Fireworks from './Fireworks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// Container for the whole app
const Container = styled.div`
  display:flex ;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
  box-shadow: 0 8px 10px rgba(0,0,0,0.1);
`;

// Styling for button container
const ButtonContainer = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
`;

// Button styling for Yes, No, Maybe options
const MotionButton = styled(motion.button)`
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

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: #2a9d8f;
  cursor: pointer;
  padding: 20px 40px;
  margin: 20px;
  font-size: 30px;
  text-decoration: underline;

  &:hover {
    color: #264653; /* Darker shade for hover state */
    text-decoration: none;
  }

  &:focus {
    outline: none; /* Removes the outline to keep the UI clean */
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
  const [lastAction, setLastAction] = useState(null);
  const [showRejectedNames, setShowRejectedNames] = useState(false);
const toggleRejectedNames = () => {
    setShowRejectedNames(prev => !prev);
  };
  

  useEffect(() => {
    const filteredNames = namesList.filter(name => !selectedNames.includes(name) && !rejectedNames.includes(name));
    setActiveNames(filteredNames);
  }, [selectedNames, rejectedNames]);

  const handleResponse = (response, name) => {
    if (response === 'yes') {
      setSelectedNames(prev => [...prev, name]);
    } else if (response === 'no') {
      setRejectedNames(prev => [...prev, name]);
    }
    setLastAction({ response, name });
    setCurrentIndex(prev => (prev + 1) % activeNames.length);
  };

  const undoLastAction = () => {
    if (!lastAction) return;

    if (lastAction.response === 'yes') {
      setSelectedNames(selectedNames.filter(name => name !== lastAction.name));
    } else if (lastAction.response === 'no') {
      setRejectedNames(rejectedNames.filter(name => name !== lastAction.name));
    }
    

    setLastAction(null);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeNames]);

  return (
    <Container>
        <div className='selected-names'>Find the perfect name for your puppy</div>

        {activeNames.length > 0 ? (
          <>
            <NameContainer
                key={activeNames[currentIndex]}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                >
                {activeNames[currentIndex]}
            </NameContainer>

            <ButtonContainer>
                <MotionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.95 }} onClick={() => handleResponse('yes', activeNames[currentIndex])} >Yes
                </MotionButton>
                <MotionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.95 }} onClick={() => handleResponse('no', activeNames[currentIndex])}>No</MotionButton>
                <MotionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.95 }} onClick={() => handleResponse('maybe', activeNames[currentIndex])}>Maybe</MotionButton>
                <MotionButton onClick={undoLastAction}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} size="lg" /> 
                </MotionButton>
            </ButtonContainer>

          </>
        ) : (
          <motion.div className="fireworks">🎆 Congratulations! This is your chosen list of names. 🎆
          <Fireworks /></motion.div>
        )}
            <motion.div className='selected-names'>Selected names: {selectedNames.join(', ')}</motion.div>

            <ToggleLink onClick={toggleRejectedNames}>
                {showRejectedNames ? 'Hide' : 'Show'} names I didn't like
            </ToggleLink>
        
        {showRejectedNames && (
      <div>
        <h3>Names Rejected:</h3>
        <ul>
          {rejectedNames.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    )}
  </Container>
);
}
export default NameSelector;



  