import './App.css'
import './button.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                   
import 'primeicons/primeicons.css';                                
import React, { useState, useEffect } from 'react';
import DataTableComponent from './Components/DataTableComponent';

function App() {
    const [showTable, setShowTable] = useState(false);  

    const handleButtonClick = () => {
        setShowTable(true);   
    };

    return (
        <div className="firstcard">
            <h1 className="lisanslar-title">Lisanslar</h1>  
            {!showTable && (<button className="show" onClick={handleButtonClick}>Lisansları Görüntüle</button>)} 
            {showTable && <DataTableComponent />}
        </div>
    );
}

export default App;
