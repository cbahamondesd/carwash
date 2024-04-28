import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

import {
    createPetRequest,
    getAllPetsRequest,
    getPetRequest,
    getMyPetsRequest,
    updatePetRequest,
    deletePetRequest
} from "../Api/pets";

const PetContext = createContext();

export const usePets = () => {

    const context = useContext(PetContext);

    if (!context) {
        throw new Error("usePets must be used within a PetProvider");
    }

    return context;
};

export function PetProvider({ children }) {
    const [pets, setPets] = useState([]);
    const { user } = useContext(AuthContext);

    const createPet = async (pet) => {
        try {
            const petWithOwner = { ...pet, petOwner: user.id};
            const res = await createPetRequest(petWithOwner);
            console.log(res);
            getAllPets();
        } catch (error) {
            console.error(error);
        }
    };

    const getAllPets = async () => {
        try {
        const res = await getAllPetsRequest();
        setPets(res.data);
        } catch (error) {
        console.error(error);
        }
    };

    const getPet = async (id) => {
        try {
            const res = await getPetRequest(id);
            if (res.status === 200) {
                const updatedPets = pets.filter((pet) => pet._id !== id);
                const fetchedPet = await res.data;
                setPets([...updatedPets, fetchedPet])
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getMyPets = async () => {
        try {
        const res = await getMyPetsRequest();
        setPets(res.data);
        } catch (error) {
        console.error(error);
        }
    };

    const updatePet = async (updatedPet) => {
        try {
        const res = await updatePetRequest(updatedPet.id, updatedPet);
        if (res.status === 200){
            setPets(prevPets => prevPets.map(pet => (pet.id === updatedPet.id ? updatedPet : pet)))
        }
        } catch (error) {
        console.error(error);
        }
    };

    const deletePet = async (id) => {
        try {
        const res = await deletePetRequest(id);
        if (res.status === 200) setPets(pets.filter((pet) => pet.id !== id));
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <PetContext.Provider
        value={{
            pets,
            createPet,
            getAllPets,
            getPet,
            getMyPets,
            updatePet,            
            deletePet,
        }}
        >
        {children}
        </PetContext.Provider>
    );
    }

PetProvider.propTypes = {
    children: PropTypes.node.isRequired,
};