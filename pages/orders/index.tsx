import React from 'react';

import Sidebar from '@/components/sidebar';
import Header from './header';
import Content from './content';

const Orders = () => {
    return (
            <div className='font-montserrat'>  
                <Sidebar/>
                <Header/>
                <Content/>
            </div>
        );
    };  
    
export default Orders;
