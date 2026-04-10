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
    const [district, setSelectedDistrict] = useState("");
    const [province, setSelectedProvince] = useState("");
    const [prediction, setPrediction] = useState(null);
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

    const HandlePrediction = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://127.0.0.1:5000/predict_credit_denial', {
               district,
               province,
               s10aq3_converted: Number(s10aq3_converted),
               ur_converted: Number(ur_converted),
               poverty_converted: Number(poverty_converted),
               quintile_converted: Number(quintile_converted)
            });

            setPrediction(res.data.result);
            setLoading(false);
        }  catch (err) {
            console.error(err);
            setMessage("Failed to predict");
        }
    } 


    return (
        <div>
            <h2>Rwanda Credit Denial AI-baed app</h2>
            <div>
                <label htmlFor="">Hitamo Akarere</label>
                <select onChange={(e) => setSelectedProvince(e.target.value)}>
                    {provinceList?.map((prov, index) => (
                            <option value={`${prov}`} key={index}>{prov}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor="">Select your District</label>
                <select onChange={(e) => setSelectedDistrict(e.target.value)}>
                    {districtList?.map((dist, idx) => (
                            <option value={`${dist}`} key={idx}>{dist}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="">Have you take credit before</label>
                <select onChange={(e) => setS10aq3_converted(e.target.value)}>
                     <option value="0">No</option>
                     <option value="1">Yes</option>
                </select>
            </div>
         
            <div>
                <label htmlFor="">Choose your UR</label>
                <select onChange={(e) => setUr_converted(e.target.value)}>
                     <option value="0">Rular </option>
                     <option value="1">Urban</option>
                </select>
            </div>
          
            <div>
                <label htmlFor="">Choose your category</label>
                <select onChange={(e) => setPoverty_converted(e.target.value)}>
                     <option value="2">Non Poor</option>
                     <option value="1">Moderately Poor</option>
                     <option value="0">Severally Poor</option>
                </select>
            </div>
        
            <div>
                <label htmlFor="">Choose your quintile</label>
                <select onChange={(e) => setQuintile_converted(e.target.value)}>
                     <option value="0">Poor</option>
                     <option value="0.5">Poor/Mid</option>
                     <option value="1">Mid</option>
                     <option value="1.5">Mid/Upper</option>
                     <option value="2">Upper</option>
                </select>
            </div>

            <button onClick={HandlePrediction}>Get result</button>

           {prediction !== null && (
            <div>
                <h2>Allowed for credit</h2>
                 <p>{prediction}</p>
            </div>
           )}

        </div>
    )
}
