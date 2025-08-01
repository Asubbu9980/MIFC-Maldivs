import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MIFCVertical from '../components/Home/MIFCVertical';
import MIFCHorizontal from '../components/Home';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/vertical" element={<MIFCVertical />} />
                <Route path="/horizontal" element={<MIFCHorizontal />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
