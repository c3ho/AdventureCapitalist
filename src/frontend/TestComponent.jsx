import React, { useEffect, useState } from 'react'
import ShopItem from './Shop'
import { Container } from '@material-ui/core';
var io2 = require('socket.io-client');
var socket2 = io2.connect('http://localhost:8321');

export default function TestComponent(){
    const [shops, setShops] = useState([]);
    const [cash, setCash] = useState(0);

    // On component mount, subscribe to webserver and get current cash and shop amounts
    useEffect(() => {
        socket2 = io2.connect('http://localhost:8321');

        socket2.emit('bar', 'getShops');
        socket2.on('bar', (msg) => {
            setShops(msg)
        });

        socket2.emit('cash', 'getCash');
        socket2.on('cash', (msg) => {
            setCash(msg);
        });
        // Clean up
        return () => socket2.off
    }, []);

    // Handles user clicking to purchase shop
    function handlePurchaseClick(shopName, amount) {
        const purchase = {shopName, amount}
        socket2.emit('bar', purchase)
    }

    // Handles user clicking of shops to get revenue
    function handleRevenueClick(amount){
        socket2.emit('cash', amount)
    }

    // Mapping function to display all shops
    // Error here with  the revClick, it should be using the shop getting revenue
    // Revenue is currently returning even when amount == 0
    const listShops = shops.length > 0 ? shops.map(shop => <ShopItem item={shop} click={e => handlePurchaseClick(shop._name, 1)} isDisabled={shop._currCost > cash} revClick={e => handleRevenueClick(shop.revenue)} />) : null

    return(
        <div>
            <Container>
                {cash}
            </Container>
            <Container>
                {listShops}
            </Container>
        </div>
    )
}