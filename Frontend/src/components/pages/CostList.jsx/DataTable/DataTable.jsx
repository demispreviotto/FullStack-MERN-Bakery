import React, { useState } from 'react'
import { VscEdit } from "react-icons/vsc";
import './DataTable.css'

const DataTable = ({ data, updateData }) => {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editableData, setEditableData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleInputChange = (index, column, value) => {
        const updatedData = [...editableData];
        updatedData[index][column] = value;

        updatedData[index]['Fecha'] = new Date().toLocaleDateString();

        setEditableData(updatedData);
        updateData(updatedData);
    };

    const startEditing = (index) => {
        editingIndex === -1 ? setEditingIndex(index) : setEditingIndex(-1);
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        const sorted = [...editableData];
        if (sortConfig.key !== null) {
            sorted.sort((a, b) => {
                const key = sortConfig.key;
                if (a[key] < b[key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sorted;
    };

    const newLine = () => {
        const emptyRow = editableData.length ? Object.assign({}, editableData[0]) : {};

    }

    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    const columns = ['id', ...Object.keys(data[0])];


    return (
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column}>
                                {column !== 'id' && (
                                    <div>
                                        <span onClick={() => requestSort(column)}>{column}</span>
                                        {sortConfig.key === column && (
                                            <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData().map((row, index) => (
                        <tr key={index}>
                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex}>{
                                    column === 'id' ? index + 1 :
                                        editingIndex === index ? (
                                            <input type='text' value={row[column]}
                                                onChange={(e) => handleInputChange(index, column, e.target.value)}
                                            />
                                        ) : (column === 'Precio (gr/ml)') ? (row['Costo'] / row['Presentacion (gr/ml)']).toFixed(2) : (row[column])
                                }</td>
                            ))}
                            <td className='btn-icons-td'>
                                <button className="btn-icons" onClick={() => startEditing(index)}>
                                    <VscEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default DataTable