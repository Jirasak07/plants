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
  Overlay,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { API } from "../configUrl";
import Swal from "sweetalert2";
function FromAddPlant() {
  const [province, setProvince] = useState([]);
  const [amphur, setAmphur] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectAmphurs, setSelectAmphurs] = useState("#");
  const [tambon, setTambon] = useState();
  const [zipcode, setZipcode] = useState("000");
  const [imgLeaf, setImgLeaf] = useState(null);
  const [imgFlower, setImgFlower] = useState(null);
  const [imgTrunk, setImgTrunk] = useState(null);
  const [imgFruit, setImgFruit] = useState(null);
  const [inputs, setInputs] = useState({
    plant_code: "",

    plant_name: "",

    plant_area: "-",

    x: "0",

    y: "0",

    qty: "0",

    radius: "0",

    statuss: "-",

    tambon_id: "0000",

    zipcode: "0000",

    plant_character: "-",

    amphur_id: "-",

    benefit_appliances: "-",

    benefit_foot: "-",

    benefit_medicine_animal: "-",

    benefit_medicine_human: "-",

    benefit_pesticide: "-",

    height: "0",

    name_adder: "-",

    other: "-",

    age_adder: "0",

    address_adder: "-",

    about_tradition: "-",

    about_religion: "-",

    age: "0",
    distinctive: "-",
  });
  const [idimage, setIdImage] = useState(null);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
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

      // ตรวจสอบว่า setDistrict ถูกเรียกใช้งานและค่าที่ถูกส่งเข้ามาถูกต้อง
      console.log("Calling setDistrict with:");

      setDistrict(response);
      console.log("setDistrict called successfully");
    } catch (error) {
      console.error("Error in selectDistrict:", error);
    }
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
    console.log(inputs);
  }, []);
  const onSelectAmphur = async (e) => {
    try {
      onChange(e);
      setSelectAmphurs(e.target.value);
      const value = e.target.value;
      setZipcode("");
      selectDistrict(value);
    } catch (error) {}
  };
  const onSelectDistrict = async (e) => {
    try {
      onChange(e);
      setTambon(e.target.value);
      zip();
    } catch (error) {}
  };
  const zip = async () => {
    try {
      const post = await axios.post(API + "/Plant/ZipCode", {
        amphur: inputs.tambon_id,
      });
      const response = post.data[0].ZIPCODE;
      setZipcode(response);
      console.log("setZipcode called successfully");
    } catch (error) {}
  };
  const handleFileChange = (files, val) => {
    if (files.length > 0) {
      if (
        files &&
        (files[0].type === "image/png" ||
          files[0].type === "image/jpeg" ||
          files[0].type === "image/jpg")
      ) {
        const file = files[0];
        if (val === 1) {
          setImgLeaf(file);
        } else if (val === 2) {
          setImgTrunk(file);
        } else if (val === 3) {
          setImgFlower(file);
        } else {
          setImgFruit(file);
        }
      } else {
        Swal.fire({
          icon: "info",
          title:
            "กรุณาเลือกไฟล์รูปภาพที่เป็นประเภท png, jpg, หรือ jpeg เท่านั้น",
        }).then((res) => {
          if (val === 1) {
            setImgLeaf(null);
          } else if (val === 2) {
            setImgTrunk(null);
          } else if (val === 3) {
            setImgFlower(null);
          } else {
            setImgFruit(null);
          }
        });
      }
    }
  };
  const handleUpload = (val, id, name) => {
    if (val) {
      const formData = new FormData();
      formData.append("file", val);
      formData.append("name", id + name);
      formData.append("user_id", 1);
      formData.append("plant_id", id);
      axios
        .post(API + "/Plant/uploadImage", formData)
        .then((response) => {
          console.log("Upload successful:");
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };
  const onSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    const addPlant = async () => {
      try {
        const go = await axios.post(API + "/Plant/AddPlant", {
          plant_code: inputs.plant_code,
          plant_name: inputs.plant_name,
          area: inputs.plant_area,
          x: inputs.x,
          y: inputs.y,
          distinctive: inputs.distinctive,
          qty: inputs.qty,
          radius: inputs.radius / 100,
          status: inputs.statuss,
          tambon_id: inputs.tambon_id,
          zipcode: zipcode,
          plant_character: inputs.plant_character,
          amphur_id: inputs.amphur_id,
          benefit_appliances: inputs.benefit_appliances,
          benefit_foot: inputs.benefit_foot,
          benefit_medicine_animal: inputs.benefit_medicine_animal,
          benefit_medicine_human: inputs.benefit_medicine_human,
          benefit_pesticide: inputs.benefit_pesticide,
          height: inputs.height / 100,
          name_adder: inputs.name_adder,
          other: inputs.other,
          age_adder: inputs.age_adder,
          address_adder: inputs.address_adder,
          about_tradition: inputs.about_tradition,
          about_religion: inputs.about_religion,
          age: inputs.age,
          user_id: localStorage.getItem("user_id"),
        });
        const respo = go.data;
        console.log(respo);
        if (respo.mes === "success") {
          setIdImage(respo.val);
          return respo;
        } else {
          return "error";
        }
      } catch (error) {}
    };
    (async () => {
      try {
        addPlant()
          .then((res) => {
            if (res.mes === "success") {
              const va = res.val;

              if (va) {
                if (imgFlower) {
                  handleUpload(imgFlower, va, "flower");
                } else {
                  console.log("not Floer");
                }
                if (imgTrunk) {
                  handleUpload(imgTrunk, va, "trunk");
                } else {
                  console.log("not trunk");
                }
                if (imgFruit) {
                  handleUpload(imgFruit, va, "fruit");
                } else {
                  console.log("not fruit");
                }
                if (imgLeaf) {
                  handleUpload(imgLeaf, va, "leaf");
                } else {
                  console.log("not Leaf");
                }
              }
            } else if (res.data === "error") {
              Swal.fire({
                icon: "error",
                title: "Hi",
              });
            } else if (res === "error") {
              Swal.fire({
                icon: "error",
                title: "Hi",
              });
            }
          })
          .then((d) => {
            setLoad(false);
            Swal.fire({
              icon: "success",
              title: "เพิ่มพืชพรรณใหม่เสร็จสิ้น",
            }).then((e) => {
              window.location.reload();
            });
          });
      } catch (error) {
        // จัดการข้อผิดพลาดที่เกิดขึ้นในกรณีที่เรียกใช้ addPlant() ไม่สำเร็จ
        console.error(error);
      }
    })();
  };
  const [load, setLoad] = useState(false);

  return (
    <Pane className="pt-2">
      <Overlay isShown={load}>
        <div class="lds-dual-ring"></div>
      </Overlay>
      <form onSubmit={onSubmit}>
        <div className="d-flex flex-column flex-md-row" style={{ gap: "10px" }}>
          <TextInputField
            width="100%"
            name="plant_name"
            label="ชื่อพรรณไม้"
            onChange={onChange}
            onBlur={onChange}
            // onPaste={}
            autoFocus={true}
            required
          />
          <TextInputField
            name="plant_code"
            label="รหัสพรรณไม้"
            onChange={onChange}
            onBlur={onChange}
            width="100%"
            required
          />
        </div>
        <TextInputField
          name="plant_character"
          label="ลักษณะวิสัยของพรรณไม้"
          onChange={onChange}
          onBlur={onChange}
        />
        <TextareaField
          name="distinctive"
          label="ลักษณะเด่นของพรรณไม้"
          onChange={onChange}
          onBlur={onChange}
        />
        <TextareaField
          name="plant_area"
          label="บริเวณที่พบพรรณไม้"
          onChange={onChange}
          onBlur={onChange}
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
              <TextInput
                name="x"
                onChange={onChange}
                onBlur={onChange}
                width={"100%"}
              />
            </Group>
            <Group
              className="col p-0 d-flex align-items-center "
              style={{ gap: "10px" }}
            >
              <strong>Y</strong>{" "}
              <TextInput
                name="y"
                onChange={onChange}
                onBlur={onChange}
                width={"100%"}
              />
            </Group>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row" style={{ gap: "10px" }}>
          <TextInputField label="จังหวัด" width="100%" value={province.label} />
          <SelectField
            width="100%"
            name="amphur_id"
            value={selectAmphurs || ""}
            label="อำเภอ"
            onChange={onSelectAmphur}
            required
          >
            <option value={"#"}>เลือกอำเภอ...</option>
            {amphur.map((i) => (
              <option value={i.AMPHUR_ID}>{i.AMPHUR_NAME}</option>
            ))}
          </SelectField>
          <SelectField
            width="100%"
            label="ตำบล"
            name="tambon_id"
            value={tambon}
            onChange={onSelectDistrict}
            required
          >
            <option value={"#"}>เลือกตำบล...</option>
            {Array.isArray(district) &&
              district.map((i) => (
                <option key={i.DISTRICT_ID} value={i.DISTRICT_ID}>
                  {i.DISTRICT_NAME}
                </option>
              ))}
          </SelectField>
        </div>
        <div className="d-flex flex-column flex-md-row" style={{ gap: "10px" }}>
          <TextInputField
            label="อายุโดยประมาณของพืช (ปี)"
            name="age"
            width="100%"
            type="number"
            onChange={onChange}
            onBlur={onChange}
          />
          <TextInputField
            label="เส้นรอบวงลำต้น(เซนติเมตรเมตร)"
            name="radius"
            type="number"
            width="100%"
            onChange={onChange}
            onBlur={onChange}
          />
          <TextInputField
            label="ความสูงโดยประมาณของพืช (เซนติเมตรเมตร)"
            name="height"
            type="number"
            width="100%"
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <TextInputField
            width="100%"
            name="statuss"
            label="สถานภาพของพืช"
            onChange={onChange}
            onBlur={onChange}
          />
          <TextInputField
            width="40%"
            type="number"
            name="qty"
            label="จำนวน (ต้น)"
            onChange={onChange}
            onBlur={onChange}
          />
        </div>
        <div className="d-flex flex-column  mb-2">
          <Label>การใช้ประโยชน์ในท้องถิ่น (ระบุส่วนที่ใช้และวิธีกำรใช้)</Label>
          <div className="container-about">
            <TextareaField
              label="อาหาร"
              name="benefit_foot"
              onChange={onChange}
              onBlur={onChange}
              width="100%"
            />
            <TextareaField
              label="ยารักษาโรค ใช้กับคน"
              name="benefit_medicine_human"
              onChange={onChange}
              onBlur={onChange}
              width="100%"
            />
            <TextareaField
              label="ยารักษาโรค ใช้กับสัตว์"
              name="benefit_medicine_animal"
              onChange={onChange}
              onBlur={onChange}
            />
            <TextareaField
              label="เครื่องเรือน เครื่องใช้อื่น ๆ"
              name="benefit_appliances"
              onChange={onChange}
              onBlur={onChange}
            />
            <TextareaField
              label="ยาฆ่าแมลง ยาปราบศัตรูพืช"
              name="benefit_pesticide"
              onChange={onChange}
              onBlur={onChange}
            />
            <TextareaField
              label="ความเกี่ยวข้องกับประเพณี วัฒนธรรม"
              name="about_tradition"
              onChange={onChange}
              onBlur={onChange}
            />
            <TextareaField
              label="ความเกี่ยวข้องกับความเชื่อทางศาสนา"
              name="about_religion"
              onChange={onChange}
              onBlur={onChange}
            />
            <TextareaField
              label="อื่นๆ (เช่นการเป็นพิษ อันตราย)"
              name="other"
              onChange={onChange}
              onBlur={onChange}
            />
          </div>
        </div>
        <div className="container-img " style={{ gap: "10px" }}>
          <Pane width="100%">
            <FilePicker
              onChange={(e) => handleFileChange(e, 1)}
              placeholder="เลือกรูปภาพใบ"
              accept=".png, .jpg, .jpeg"
              validate={(file) => {
                const maxFileSize = 5 * 1024 * 1024; // 5 MB
                if (file.size > maxFileSize) {
                  return "File size exceeds the limit";
                }
                return null;
              }}
            />
            {imgLeaf && (
              <Image
                src={URL.createObjectURL(imgLeaf)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
          <Pane width="100%">
            <FilePicker
              onChange={(e) => handleFileChange(e, 2)}
              placeholder="เลือกรูปภาพต้น"
              accept=".png, .jpg, .jpeg"
              validate={(file) => {
                const maxFileSize = 5 * 1024 * 1024; // 5 MB
                if (file.size > maxFileSize) {
                  return "File size exceeds the limit";
                }
                return null;
              }}
            />
            {imgTrunk && (
              <Image
                src={URL.createObjectURL(imgTrunk)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
          <Pane width="100%">
            <FilePicker
              onChange={(e) => handleFileChange(e, 3)}
              placeholder="เลือกรูปภาพดอก"
              accept=".png, .jpg, .jpeg"
              validate={(file) => {
                const maxFileSize = 5 * 1024 * 1024; // 5 MB
                if (file.size > maxFileSize) {
                  return "File size exceeds the limit";
                }
                return null;
              }}
            />
            {imgFlower && (
              <Image
                src={URL.createObjectURL(imgFlower)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
          <Pane width="100%">
            <FilePicker
              onChange={(e) => handleFileChange(e, 4)}
              placeholder="เลือกรูปภาพผล"
              accept=".png, .jpg, .jpeg"
              validate={(file) => {
                const maxFileSize = 5 * 1024 * 1024; // 5 MB
                if (file.size > maxFileSize) {
                  return "File size exceeds the limit";
                }
                return null;
              }}
            />
            {imgFruit && (
              <Image
                src={URL.createObjectURL(imgFruit)}
                alt="Preview"
                width="100%"
              />
            )}
          </Pane>
        </div>
        <div className="d-flex flex-column mb-2 mt-2 pt-3">
          <Label className="ml-2" style={{ fontWeight: "600" }}>
            ผู้ให้ข้อมูล
          </Label>
          <div className="d-flex" style={{ gap: "10px" }}>
            <TextInputField
              label="ชื่อ-สกุล"
              name="name_adder"
              onChange={onChange}
              onBlur={onChange}
              width="100%"
            />
            <TextInputField
              label="อายุ"
              name="age_adder"
              width="30%"
              type="number"
              onChange={onChange}
              onBlur={onChange}
            />
          </div>

          <TextareaField
            label="ที่อยู่"
            name="address_adder"
            onChange={onChange}
            onBlur={onChange}
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
