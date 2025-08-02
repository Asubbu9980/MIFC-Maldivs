import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MIFCVertical from '../components/Home/MIFCVertical';
import MIFCHorizontal from '../components/Home/MIFCHorizontal';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/vertical" element={<MIFCVertical />} />
            <Route path="/horizontal" element={<MIFCHorizontal />} />
        </Routes>
    );
};

export default AppRoutes;
