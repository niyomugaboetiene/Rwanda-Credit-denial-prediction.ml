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
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const GetProvinces = async() => {
        try {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:5000/get_province');

            if (!res.data.province) {
                setMessage("No province found");
            }

            setProvinceList(res.data.province);
            // console.log("Provinces", res.data.province)
            setLoading(false);
        } catch (err) {
            console.error(err);
            setMessage("Failed to load province");
        }
    }
    
    const GetDistrict = async() => {
        try {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:5000/get_district');

            if (!res.data.district) {
                setMessage("No District found");
            }

            setDistrictList(res.data.district);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setMessage("Failed to load province");
        }
    } 

    useEffect(() => {
        GetProvinces();
    }, []);
    
    useEffect(() => {
        GetDistrict();
    }, []);


    return (
        <div>
            <div>
                <select>
                    {provinceList?.map((prov, index) => (
                            <option value={`${prov}`} key={index}>{prov}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
