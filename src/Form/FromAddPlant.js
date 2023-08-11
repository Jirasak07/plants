import axios from "axios";
import {
  Button,
  Pane,
  SelectField,
  SelectMenu,
  TextInputField,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";

function FromAddPlant() {
  const [select, setSelect] = useState();
  const [province, setProvince] = useState([]);
  const [amphur, setAmphur] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectProvince, setSelectProvince] = useState(null);
  const [provinceSelect,setProvinceSelect] = useState()

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(province);
  };
  const [inputs, setInputs] = useState([]);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const Fprovince = async () => {
    try {
      const province = await axios.get(
        "https://rspg-kpppao.com/backend/Plant/SelectProvince"
      );
      const response = province.data;
      setProvince(response);
      return "success";
    } catch (error) {}
  };
  const onProvinceChange= async (val)=>{
    console.log(val)
    try {
        const fetch = await axios.post("https://rspg-kpppao.com/backend/SelectAmphur",{
            pv_id:val
        })
        const res = fetch.data
        setAmphur(res)
    } catch (error) {
        
    }
  }
  useEffect(() => {
    Fprovince();
    console.log(province);
  }, []);
  return (
    <Pane>
      <form onSubmit={onSubmit}>
        <TextInputField name="plant_name" label="ชื่อพืช" onChange={onChange} />
        <TextInputField
          name="plant_code"
          label="รหัสพรรณไม้"
          onChange={onChange}
        />
        <TextInputField
          name="plant_pr"
          label="ลักษณะวิสัย"
          onChange={onChange}
        />
        <SelectMenu
          selected={selectProvince}
          onSelect={(e) => {
            setSelectProvince(e.label);
            onProvinceChange(e.value)
          }}
        //   hasFilter={false}
        closeOnSelect={true}
          hasTitle={false}
          onDeselect={()=>setSelectProvince(null)}
          options={province}
        >
          {/* <Button>{selectProvince || "Select name..."}</Button> */}
          <TextInputField label="จังหวัด" value={selectProvince || "เลือกจังหวัด"} />
        </SelectMenu>
        {/* <SelectMenu
         title="Select name"
          options={province}
          width={280}
          height={200}
          selected={province.map((i)=>({label:i.label,value:i.value}))}
          onSelect={(item) => setSelect(item.value)}
        >
    {province.map((i)=>(
        <option value={i.PROVINCE_ID} >{i.PROVINCE_NAME}</option>
    ))}
        </SelectMenu> */}
        <SelectField  >
            {amphur.map((i)=>(
                <option value={i.AMPHUR_ID} >{i.AMPHUR_NAME}</option>
            ))}
        </SelectField>
        <Button type="submit" appearance="primary" intent="success">
          บันทึก
        </Button>
      </form>
    </Pane>
  );
}

export default FromAddPlant;
