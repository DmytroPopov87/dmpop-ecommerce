import styled from "styled-components";
//animation
const { motion } = require('framer-motion');


export const CartWrapper = styled(motion.div)`
  position: fixed;
  z-index: 99999;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
`;


export const CartStyle = styled(motion.div)`
  width: 40%;
  background: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem; 
  background: white;
  padding: 2rem;
  margin: 2rem 0rem;
  overflow: hidden;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled(motion.div)`
 width: 50%;
 div {
  display: flex;
  flex-direction: space-between;
 }
`;


export const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 5%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  height: 100%;
  width: 100%;
  h1 {
    font-size: 2rem;
    padding: 2rem;
  }
  svg {
    font-size: 8rem;
    color: var(--secondary);
  }
`;

export const Checkout = styled(motion.div)`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    margin-top: 2rem;
    cursor: pointer;
    color: white;
    border: none;
  }
`;


export const Cards = styled(motion.div)``;