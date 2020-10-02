import React, { Component } from 'react';
import './Spinner.css';


class Spinner extends Component {


    render() {

        const { randomnumber, items } = this.props;
        const wheelVars = {
            '--nb-item': items.length,
            '--selected-item': randomnumber,
        };
        const spinning = randomnumber !== null ? 'spinning' : '';

        return (
            <div className="wheel-container">
                <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.props.selectedItem}>
                    {items.map((item, index) => (
                        <div className="wheel-item" key={index} style={{ '--item-nb': index }}>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Spinner;