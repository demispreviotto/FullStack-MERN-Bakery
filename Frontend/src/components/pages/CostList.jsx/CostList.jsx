import React, { useState } from 'react'
import DataTable from './DataTable/DataTable';
import data from '../../../assets/csvjson.json'
import NewIngredient from './NewIngredient/NewIngredient';
import NewItemButton from '../../common/NewItemButton/NewItemButton';
import Modal from '../../common/Modal/Modal'

const CostList = () => {
    // function convertToLowerCase(obj) {
    //     if (typeof obj === 'string') {
    //         return obj.toLowerCase();
    //     } else if (Array.isArray(obj)) {
    //         return obj.map((item) => convertToLowerCase(item));
    //     } else if (typeof obj === 'object' && obj !== null) {
    //         const result = {};
    //         for (const key in obj) {
    //             if (obj.hasOwnProperty(key)) {
    //                 result[key.toLowerCase()] = convertToLowerCase(obj[key]);
    //             }
    //         }
    //         return result;
    //     } else {
    //         return obj;
    //     }
    // }
    // console.log(convertToLowerCase(data))

    const [jsonData, setJsonData] = useState(data);
    const [modalOpen, setModalOpen] = useState(false);

    const updateData = (updatedData) => {
        setJsonData(updatedData);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }
    return (
        <>
            <h2>CostList</h2>
            <DataTable data={jsonData} updateData={updateData} />
            <NewItemButton toggleModal={toggleModal} />
            <Modal isOpen={modalOpen} onClose={toggleModal}>
                <NewIngredient toggleModal={toggleModal} />
            </Modal>
        </>
    );
};

export default CostList