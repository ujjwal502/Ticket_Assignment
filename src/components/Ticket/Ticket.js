import React, {  useState } from "react";
import "./Ticket.css";
import Spinner from "../Spinner/Spinner";
import backspace from "../../clear.svg";
import deleteIcon from '../../delete.svg'
import add from "../../plusSign.svg";

function Ticket (props) {

    // constructor(props) {
    //     super(props);
    //     this.cards = ["1", "2", "3", "4"];
    //     this.state = {
    //         count: '',
    //         cardsWithNumber: [],
    //         clear: '',
    //         randomnumber: null
    //     };
    // }
    const [cards, setCards] = useState(["1", "2", "3", "4"])
    const [values, setValues] = useState({
        count: '',
        cardsWithNumber: [],
        clear: '',
        randomnumber: null
    })

   const handle = (digit) => {
        const count = values.count;
        if (count.length < 6) {
            setValues({
                count: count === '0' ? String(digit) : count + digit,
            });
        }
    };

    const clear = () => {
        setValues((prevState) => ({
            count: prevState.count.slice(0, -1)
        }))
    }

    const deleteAll = () => {
        setValues({
            count: '',
        });
    };

    const generate = (ele) => {
        let flag = false;
        for (let i = 0; i < cardsWithNumber; i++) {
            console.log(cardsWithNumber[i])
            if (parseInt(values.count) === parseInt(values.cardsWithNumber[i])) {
                console.log(values.cardsWithNumber[i])
                flag = true;
            }
        }

        if (!flag) {
            if (values.cardsWithNumber < 5) {
                setValues({
                    cardsWithNumber: [
                        ...values.cardsWithNumber,
                        values.count
                    ],
                    count: ''
                })
            }
        } else {
            window.alert
                ('You can not have duplicate card!')
        }
    };

    const selectItem = () => {
        var minm = 100000;
        var maxm = 999999;

        if (values.randomnumber === null) {
            const randomnumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

            if (props.onSelectItem) {
                props.onSelectItem(randomnumber);
            }
            if (values.cardsWithNumber.length < 5) {
                setValues({
                    cardsWithNumber: [
                        ...values.cardsWithNumber,
                        randomnumber
                    ],
                    randomnumber: randomnumber,
                })
            }
        }
        else {
            setValues({ randomnumber: null });
            setTimeout(selectItem, 0);
        }
    };
     const deleteTicket = (index) => {
        var { cardsWithNumber } = values;
        cardsWithNumber = cardsWithNumber.filter((ele, ind) => ind !== index);
        setValues({
            generateNumber: '',
            cardsWithNumber
        })
    }

    const deleteSpinnerTicket = () => {
        setValues({
            randomnumber: null
        })
    }

    
        const { cardsWithNumber } = values;
        return (
            <div className="ticketgenerator">
                <div className="generator-container">
                    <div className="digit-container">
                        <div className="digit-header">
                            <input className=" text" placeholder=" Enter 6 digit " value={values.count} type="text" />
                        </div>

                        <div className="digit">
                            <div className="numeric-values" onClick={() => handle(7)}>
                                7
                            </div>
                            <div className="numeric-value" onClick={() => handle(8)}>
                                8
                            </div>
                            <div className="numeric-value" onClick={() => handle(9)}>
                                9
                            </div>
                            <div className="numeric-values" onClick={() => handle(4)}>
                                4
                            </div>
                            <div className="numeric-value" onClick={() => handle(5)}>
                                5
                            </div>
                            <div className="numeric-value" onClick={() => handle(6)}>
                                6
                            </div>
                            <div className="numeric-values" onClick={() => handle(1)}>
                                1
                            </div>
                            <div className="numeric-value" onClick={() => handle(2)}>
                                2
                            </div>
                            <div className="numeric-value" onClick={() => handle(3)}>
                                3
                            </div>
                            <div className="numeric-values" onClick={clear}> <img src={backspace} alt="backspace" /></div>
                            <div className="numeric-value" onClick={() => handle(0)}>
                                0
                            </div>
                            <div className="numeric-value" onClick={deleteAll}>
                                <img src={deleteIcon} alt="deleteIcon" />
                            </div>
                        </div>

                        <div className="digit-footer" onClick={generate}>
                            <img src={add} style={{ lineHeight: 2 }} alt="add" /> ADD TICKET
                        </div>
                    </div>
                    <div className="spinner-container">
                        <span> Click the Wheel to generate your ticket</span>

                        <div className="spinnerwheel">
                            <Spinner items={cards} selectedItem={selectItem} randomnumber={values.randomnumber} />
                        </div>

                        <span className="ticket-text">
                            Range of Ticket-number : 100000-999999
                        </span>
                    </div>
                </div>
                <div className="selected-ticket">
                    <span style={{ paddingLeft: "10px" }}> Your Selected Tickets : </span>
                    <div className="card-container">
                        {cardsWithNumber.map((card, index) => 
                             (
                                <div className="cards" key={index}>
                                    <img src={deleteIcon} alt="deleteIcon" className="deleteIcon" onClick={() => deleteTicket(index)} />
                                    <div className="ticket-card">
                                        <span className="card-text">Ticket  #{index + 1}</span>
                                        <span className="ticket"> {card}</span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    
}
export default Ticket;