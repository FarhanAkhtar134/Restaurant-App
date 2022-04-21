import React, {useContext, useEffect, useState} from 'react';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';
import HeaderCartIcon from './HeaderCartIcon';

const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setButtonIsHighlighted ] = useState(false);
    
    
    
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    useEffect(()=> {
        if(items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
            
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    },[items]);
    const numberOfCartItems = items.reduce((currentNumber, item)=> {

        return currentNumber + item.amount; 

    }, 0 )

    const buttonClasses = `${styles.button} ${buttonIsHighlighted ? styles.bump : '' }`;

    return <button className={buttonClasses} onClick = {props.onClick}>
        <span className={styles.icon}>
            <HeaderCartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
};


export default HeaderCartButton; 