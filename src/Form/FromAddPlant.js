import axios from "axios";
import {
  Button,
  FilePicker,
  Group,
  IconButton,
  Label,
  Pane,
  SelectField,
  SelectMenu,
  TextInput,
  TextInputField,
  Image,
  TextareaField,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { API } from "../configUrl";
import Swal from "sweetalert2";
import ImageCarousel from "./ImageCarousel";
import { TrashIcon, UploadIcon } from "evergreen-ui";

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
    async function fetchAmphur() {
      try {
        const fetch = await axios.post(API + "/Plant/SelectAmphur", {
          pv_id: "49",
        });
        const res = fetch.data;
        setAmphur(res);
      } catch (error) {}
    }
    fetchAmphur();
  }, []);
  useEffect(() => {
    console.log(amphur);
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("upload.php", formData)
        .then((response) => {
          console.log("Upload successful:", response.data);
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };
  return (
    <Pane>
      <form onSubmit={onSubmit}>
        <div className="d-flex flex-column flex-md-row" style={{ gap: "10px" }}>
          <TextInputField
            width="100%"
            name="plant_name"
            label="ชื่อพืช"
            onChange={onChange}
            autoFocus={true}
            required
          />
          <TextInputField
            name="plant_code"
            label="รหัสพรรณไม้"
            onChange={onChange}
            width="100%"
            required
          />
        </div>
        <TextInputField
          name="plant_pr"
          label="ลักษณะวิสัย"
          onChange={onChange}
          required
        />
        <TextareaField
          name="plant_area"
          label="บริเวณที่พบ"
          onChange={onChange}
          required
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
        <div className="d-flex flex-column flex-md-row" style={{ gap: "10px" }}>
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
        <div className="d-flex" style={{ gap: "10px" }}>
          <TextInputField
            width="100%"
            name="status"
            label="สถานภาพ"
            onChange={onChange}
          />
          <TextInputField
            width="40%"
            type="number"
            name="qty"
            label="จำนวน (ต้น)"
            onChange={onChange}
          />
        </div>
        <div className="d-flex flex-column  mb-2">
          <Label>การใช้ประโยชน์ในท้องถิ่น (ระบุส่วนที่ใช้และวิธีกำรใช้)</Label>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ gap: "10px" }}
          >
            <TextareaField
              label="อาหาร"
              name="benefit_foot"
              onChange={onChange}
              width="100%"
            />
            <TextareaField
              label="ยารักษาโรค ใช้กับคน"
              name="benefit_medicine_human"
              onChange={onChange}
              width="100%"
            />
          </div>

          <TextareaField
            label="ยารักษาโรค ใช้กับสัตว์"
            name="benefit_medicine_animal"
            onChange={onChange}
          />
          <TextareaField
            label="เครื่องเรือน เครื่องใช้อื่น ๆ"
            name="benefit_appliances"
            onChange={onChange}
          />
          <TextareaField
            label="ยาฆ่าแมลง ยาปราบศัตรูพืช"
            name="benefit_pesticide"
            onChange={onChange}
          />
          <TextareaField
            label="ความเกี่ยวข้องกับประเพณี วัฒนธรรม"
            name="about_tradition"
            onChange={onChange}
          />
          <TextareaField
            label="ความเกี่ยวข้องกับความเชื่อทางศาสนา"
            name="about_religion"
            onChange={onChange}
          />
          <TextareaField
            label="อื่นๆ (เช่นการเป็นพิษ อันตราย)"
            name="other"
            onChange={onChange}
          />
        </div>
        <div className="container-img " style={{ gap: "10px" }}>
          <Pane width="100%" backgroundColor="#000000">
            <FilePicker
              onChange={handleFileChange}
              placeholder="เลือกรูปภาพใบ"
              accept=".png, .jpg, .jpeg"
            />
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
          <Pane width="100%" backgroundColor="#000000">
            <FilePicker
              onChange={handleFileChange}
              placeholder="เลือกรูปภาพต้น"
              accept=".png, .jpg, .jpeg"
            />
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
          <Pane width="100%" backgroundColor="#000000">
            <FilePicker
              onChange={handleFileChange}
              placeholder="เลือกรูปภาพดอก"
              accept=".png, .jpg, .jpeg"
            />
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
          <Pane width="100%" backgroundColor="#000000">
            <FilePicker
              onChange={handleFileChange}
              placeholder="เลือกรูปภาพผล"
              accept=".png, .jpg, .jpeg"
            />
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
        </div>
        <div className="d-flex flex-column mb-2">
          <Label>ผู้ให้ข้อมูล</Label>
          <div className="d-flex" style={{ gap: "10px" }}>
            <TextInputField
              label="ชื่อ-สกุล"
              name="name_adder"
              onChange={onChange}
              width="100%"
            />
            <TextInputField
              label="อายุ"
              name="age_adder"
              width="30%"
              type="number"
              onChange={onChange}
            />
          </div>

          <TextareaField
            label="ที่อยู่"
            name="address_adder"
            onChange={onChange}
          />
        </div>
        <Button type="submit" appearance="primary" intent="success">
          บันทึก
        </Button>
      </form>
    </Pane>
  );
}

export default FromAddPlant;
