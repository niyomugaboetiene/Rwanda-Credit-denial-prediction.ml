import axios from "axios";
import React, {useEffect, useState} from "react";

export const PredictingComonent = () => {
    const [provinceList, setProvinceList] = useState(null);
    const [districtList, setDistrictList] = useState(null);
    // district, province, s10aq3_converted, ur_converted, poverty_converted, quintile_converted
    const [s10aq3_converted, setS10aq3_converted] = useState(0);
    const [ur_converted, setUr_converted] = useState("");
    const [poverty_converted, setPoverty_converted] = useState("");
    const [quintile_converted, setQuintile_converted] = useState("");
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
            // console.log(res.data.district);
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
            <h2>Rwanda Credit Denial AI-baed app</h2>
            <div>
                <label htmlFor="">Hitamo Akarere</label>
                <select>
                    {provinceList?.map((prov, index) => (
                            <option value={`${prov}`} key={index}>{prov}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor="">Select your District</label>
                <select>
                    {districtList?.map((dist, idx) => (
                            <option value={`${dist}`} key={idx}>{dist}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="">Have you take credit before</label>
                <select name="" id="">
                     <option value="0">No</option>
                     <option value="1">Yes</option>
                </select>
            </div>
         
            <div>
                <label htmlFor="">Choose your UR</label>
                <select name="" id="">
                     <option value="0">Rular </option>
                     <option value="1">Urban</option>
                </select>
            </div>
          
            <div>
                <label htmlFor="">Choose your category</label>
                <select name="" id="">
                     <option value="2">Non Poor</option>
                     <option value="1">Moderately Poor</option>
                     <option value="0">Severally Poor</option>
                </select>
            </div>
        
            <div>
                <label htmlFor="">Choose your quintile</label>
                <select name="" id="">
                     <option value="0">Poor</option>
                     <option value="0.5">Poor/Mid</option>
                     <option value="1">Mid</option>
                     <option value="1.5">Mid/Upper</option>
                     <option value="2">Upper</option>
                </select>
            </div>

            <button>Get result</button>
        </div>
    )
}
