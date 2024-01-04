import React, { useState } from 'react'
import DataTable from './DataTable/DataTable';
import data from '../../../assets/csvjson.json'
import NewIngredient from '../../Ingredient/NewIngredient/NewIngredient';
import NewItemButton from '../../common/NewItemButton/NewItemButton';
import Modal from '../../common/Modal/Modal'

const CostList = () => {

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