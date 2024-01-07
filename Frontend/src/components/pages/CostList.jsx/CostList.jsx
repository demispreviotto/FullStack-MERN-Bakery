import React, { useState } from 'react'
import DataTable from './DataTable/DataTable';
import data from '../../../assets/csvjson.json'

const CostList = () => {

    const [jsonData, setJsonData] = useState(data);

    const updateData = (updatedData) => {
        setJsonData(updatedData);
    };

    return (
        <>
            <h2>CostList</h2>
            <DataTable data={jsonData} updateData={updateData} />
        </>
    );
};

export default CostList