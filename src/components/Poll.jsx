import React, {useState, useEffect, useContext} from 'react'
import Modal from 'react-modal';
import {Line} from 'rc-progress'
import { PollContext } from './PollContext';
import styles from 'react-native-toast-message/src/styles';
import style from './pollStyles'
import ChatContext, {controlMessageEnum} from './ChatContext';

const Poll = ()=>{
    const {question, setQuestion, answers: voteData, setAnswers, isModalOpen, setIsModalOpen} = useContext(PollContext);
    const {sendControlMessage} = useContext(ChatContext)

    const [totalVotes, setTotalVotes] = useState(0)
    const [voted, setVoted] = useState(false);

    const submitVote = (e, chosenAnswer) => {
        if(!voted) {
            const newAnswers = voteData.map((answer)=> {
                if(chosenAnswer.option=== answer.option) {
                    return {...answer, votes:answer.votes+1}
                } else {
                    return answer;
                }
            });
            setAnswers(newAnswers);
            sendControlMessage(controlMessageEnum.initiatePoll, {question, answers:newAnswers});
            setTotalVotes((prevTotalvotes)=> prevTotalvotes + 1);
            setVoted((prevVoted)=>!prevVoted);
        }

    }



    const closeModal = () =>{
        setIsModalOpen(false);
        setTotalVotes(false)
        setVoted(false);
        setQuestion('');
        setAnswers([
            {options: '', votes: 0},
            {options: '', votes: 0},
            {options: '', votes: 0},
            {options: '', votes: 0},
        ]);
    }

    return (
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        content="Poll Modal"
        style = {style.customStyles}
        >
<div>
    <h1>{question}</h1>
    <div style = {style.flexColumn}>
        {voteData && voteData.map((answer, i)=>!voted? (
            <button style = {style.button} key={i} onClick={(e)=>submitVote(e, answer)}>
                {answer.option}

            </button>
        ):(
            <div style={style.flexCenter} key={i}>
                <h2  style = {style.mr20}>{answer.option}</h2>
                <Line percent={(answer.votes/totalVotes)*100} strokeWidth="4" trailWidth="3" />
<p style = {style.ml20}>{answer.votes}</p>

                 </div>
        ))}

    </div>
    <h3>Total votes : {totalVotes}</h3>
</div>

        </Modal>
    )


}
export default Poll;