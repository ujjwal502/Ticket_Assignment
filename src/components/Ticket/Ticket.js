import React, { Component } from "react";
import "./Ticket.css";
import Spinner from "../Spinner/Spinner";
import backspace from "../../clear.svg";
import deleteIcon from '../../delete.svg'
import add from "../../plusSign.svg";

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.cards = ["1", "2", "3", "4"];
        this.state = {
            count: '',
            cardsWithNumber: [],
            clear: '',
            randomnumber: null
        };
    }

    handle = (digit) => {
        const count = this.state.count;
        if (count.length < 6) {
            this.setState({
                count: count === '0' ? String(digit) : count + digit,
            });
        }
    };

    clear = () => {
        this.setState((prevState) => ({
            count: prevState.count.slice(0, -1)
        }))
    }

    deleteAll = () => {
        this.setState({
            count: '',
        });
    };

    generate = (ele) => {
        let flag = false;
        for (let i = 0; i < this.state.cardsWithNumber.length; i++) {
            console.log(this.state.cardsWithNumber[i])
            if (parseInt(this.state.count) === parseInt(this.state.cardsWithNumber[i])) {
                console.log(this.state.cardsWithNumber[i])
                flag = true;
            }
        }

        if (!flag) {
            if (this.state.cardsWithNumber.length < 5) {
                this.setState({
                    cardsWithNumber: [
                        ...this.state.cardsWithNumber,
                        this.state.count
                    ],
                    count: ''
                })
            }
        } else {
            window.alert
                ('You can"t have duplicate card!')
        }
    };

    selectItem = () => {
        var minm = 100000;
        var maxm = 999999;

        if (this.state.randomnumber === null) {
            const randomnumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

            if (this.props.onSelectItem) {
                this.props.onSelectItem(randomnumber);
            }
            if (this.state.cardsWithNumber.length < 5) {
                this.setState({
                    cardsWithNumber: [
                        ...this.state.cardsWithNumber,
                        randomnumber
                    ],
                    randomnumber: randomnumber,
                })
            }
        }
        else {
            this.setState({ randomnumber: null });
            setTimeout(this.selectItem, 0);
        }
    };
    deleteTicket = (index) => {
        var { cardsWithNumber } = this.state;
        cardsWithNumber = cardsWithNumber.filter((ele, ind) => ind !== index);
        this.setState({
            generateNumber: '',
            cardsWithNumber
        })
    }

    deleteSpinnerTicket = () => {
        this.setState({
            randomnumber: null
        })
    }

    render() {
        const { cardsWithNumber } = this.state;
        return (
            <div className="ticketgenerator">
                <div className="generator-container">
                    <div className="digit-container">
                        <div className="digit-header">
                            <input className=" text" placeholder=" Enter 6 digit " value={this.state.count} type="text" />
                        </div>

                        <div className="digit">
                            <div className="numeric-values" onClick={() => this.handle(7)}>
                                7
                            </div>
                            <div className="numeric-value" onClick={() => this.handle(8)}>
                                8
                            </div>
                            <div className="numeric-value" onClick={() => this.handle(9)}>
                                9
                            </div>
                            <div className="numeric-values" onClick={() => this.handle(4)}>
                                4
                            </div>
                            <div className="numeric-value" onClick={() => this.handle(5)}>
                                5
                            </div>
                            <div className="numeric-value" onClick={() => this.handle(6)}>
                                6
                            </div>
                            <div className="numeric-values" onClick={() => this.handle(1)}>
                                1
                            </div>
                            <div className="numeric-value" onClick={() => this.handle(2)}>
                                2
                            </div>
                            <div className="numeric-value" onClick={() => this.handle(3)}>
                                3
                            </div>
                            <div className="numeric-values" onClick={this.clear}> <img src={backspace} alt="backspace" /></div>
                            <div className="numeric-value" onClick={() => this.handle(0)}>
                                0
                            </div>
                            <div className="numeric-value" onClick={this.deleteAll}>
                                <img src={deleteIcon} alt="deleteIcon" />
                            </div>
                        </div>

                        <div className="digit-footer" onClick={this.generate}>
                            <img src={add} style={{ lineHeight: 2 }} alt="add" /> ADD TICKET
                        </div>
                    </div>
                    <div className="spinner-container">
                        <span> Click the Wheel to generate your ticket</span>

                        <div className="spinnerwheel">
                            <Spinner items={this.cards} selectedItem={this.selectItem} randomnumber={this.state.randomnumber} />
                        </div>

                        <span className="ticket-text">
                            Range of Ticket-number : 100000-999999
                        </span>
                    </div>
                </div>
                <div className="selected-ticket">
                    <span style={{ paddingLeft: "10px" }}> Your Selected Tickets : </span>
                    <div className="card-container">
                        {cardsWithNumber.map((card, index) => {
                            return (
                                <div className="cards" key={index}>
                                    <img src={deleteIcon} alt="deleteIcon" className="deleteIcon" onClick={() => this.deleteTicket(index)} />
                                    <div className="ticket-card">
                                        <span className="card-text">Ticket  #{index + 1}</span>
                                        <span className="ticket"> {card}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Ticket;