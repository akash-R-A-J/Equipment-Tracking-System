import {atom, selector} from "recoil";

export const addEquipmentState = atom({
    key: "addEquipmentState",
    default: {
        name: "",
        serialNumber: "",
        currentOwner: "",
        equipmentImage: null,
        document: null,
    }
})

export const addEquipmentQuery = selector({
    key: "addEquipmentQuery",
    get: ({get}) => {
        
    }
})