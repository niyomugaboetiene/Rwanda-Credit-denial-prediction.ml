import axios from "axios";
import React, {useEffect, useState} from "react";

export const PredictingComonent = () => {
    const [provinceList, setProvinceList] = useState(null);
    const [districtList, setDistrictList] = useState(null);
    // district, province, s10aq3_converted, ur_converted, poverty_converted, quintile_converted
    const [s10aq3_converted, setS10aq3_converted] = useState(0);
    const [ur_converted, setUr_converted] = useState(0);
    const [poverty_converted, setPoverty_converted] = useState(0);
    const [quintile_converted, setQuintile_converted] = useState(0);


    const GetProvinces = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/get_province')
        }
    } 
}