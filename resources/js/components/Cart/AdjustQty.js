import React from 'react'
import { Button } from 'react-bootstrap'
import "./Cart.css";

function AdjustQty(props) {
    return (
        <div>
            <Button variant="secondary" style={styles.buttonQty} size="sm">-</Button>
            <label>{props.cartQty}</label>
            <Button variant="secondary" style={styles.buttonQty} size="sm">+</Button>
        </div>
    )
}

export default AdjustQty

const styles = {
    buttonQty:{
        width: '6px',
        heigth: '6px',
        borderRadius: '100%',
        justifuContent: 'center',
        alignItems: 'center'
    }
};
