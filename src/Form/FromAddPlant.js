import axios from "axios";
import {
  Button,
  Group,
  Label,
  Pane,
  SelectField,
  SelectMenu,
  TextInput,
  TextInputField,
  Textarea,
  TextareaField,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { API } from "../configUrl";
import Swal from "sweetalert2";

function FromAddPlant() {
  // const [select, setSelect] = useState();
  const [province, setProvince] = useState([]);
  const [amphur, setAmphur] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectAmphurs, setSelectAmphurs] = useState("#");
  const [tambon, setTambon] = useState();
  const [zipcode, setZipcode] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
    });
    console.log(inputs);
  };
  const [inputs, setInputs] = useState([]);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const Fprovince = async () => {
    try {
      const province = await axios.get(API + "/Plant/SelectProvince");
      const response = province.data[0];
      setProvince(response);
      return "success";
    } catch (error) {}
  };
  const selectAmphur = async () => {
    try {
      const fetch = await axios.post(API + "/Plant/SelectAmphur", {
        pv_id: "49",
      });
      const res = fetch.data;
      setAmphur(res);
    } catch (error) {}
  };
  const selectDistrict = async (val) => {
    try {
      const post = await axios.post(API + "/Plant/SelectTambon", {
        amphur: val,
      });
      const response = post.data;
      setDistrict(response);
    } catch (error) {}
  };
  useEffect(() => {
    Fprovince();
    selectAmphur();
  }, []);
  const onSelectAmphur = async (e) => {
    try {
      onChange(e);
      setSelectAmphurs(e.target.value);
      const value = e.target.value;
      await selectDistrict(value);
    } catch (error) {}
  };
  const onSelectDistrict = async (e) => {
    try {
      onChange(e);
      setTambon(e.target.value);
      const post = await axios.post(API + "/Plant/ZipCode", {
        amphur: inputs.amphur_id,
      });
      const response = post.data[0].ZIPCODE;
      setZipcode(response);
    } catch (error) {}
  };
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
        <TextareaField
          name="plant_area"
          label="บริเวณที่พบ"
          onChange={onChange}
        />
        <div className="d-flex flex-column mb-2">
          <Label>แสดงพิกัดตำแหน่งพรรณไม้ (GIS)</Label>
          <div className="d-flex m-0 p-0" style={{ gap: "10px" }}>
            <Group
              className="col p-0 d-flex align-items-center "
              style={{ gap: "10px" }}
            >
              <strong>X</strong>{" "}
              <TextInput name="x" onChange={onChange} width={"100%"} />
            </Group>
            <Group
              className="col p-0 d-flex align-items-center "
              style={{ gap: "10px" }}
            >
              <strong>Y</strong>{" "}
              <TextInput name="y" onChange={onChange} width={"100%"} />
            </Group>
          </div>
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <TextInputField label="จังหวัด" width="100%" value={province.label} />
          <SelectField
            width="100%"
            name="amphur_id"
            value={selectAmphurs || ""}
            label="อำเภอ"
            onChange={onSelectAmphur}
          >
            <option value={"#"}>เลือกอำเภอ...</option>
            {amphur.map((i) => (
              <option value={i.AMPHUR_ID}>{i.AMPHUR_NAME}</option>
            ))}
          </SelectField>
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <SelectField
            width="100%"
            label="ตำบล"
            name="tambon_id"
            value={tambon}
            onChange={onSelectDistrict}
          >
            <option value={"#"}>เลือกตำบล...</option>
            {district.map((i) => (
              <option value={i.DISTRICT_ID}>{i.DISTRICT_NAME}</option>
            ))}
          </SelectField>
          <TextInputField
            width="100%"
            label="รหัสไปรษณีย์"
            name="zipcode"
            value={zipcode}
          />
        </div>
        <div className="d-flex" style={{gap:'10px'}} >
        <TextInputField
          label="อายุโดยประมาณ (ปี)"
          name="age"
          width="100%"
          onChange={onChange}
        />
        <TextInputField
          label="เส้นรอบวงลำต้น(เมตร)"
          name="radius"
          width="100%"
          onChange={onChange}
        />
        <TextInputField
          label="ความสูง (เมตร)"
          name="height"
          width="100%"
          onChange={onChange}
        />
        </div>
      <div className="d-flex" style={{gap:'10px'}} >
        <TextInputField width="100%" name="status" label="สถานภาพ" onChange={onChange} />
        <TextInputField width="40%" type="number" name="qty" label="จำนวน (ต้น)" onChange={onChange} />
      </div>
        <Button type="submit" appearance="primary" intent="success">
          บันทึก
        </Button>
      </form>
    </Pane>
  );
}

export default FromAddPlant;
