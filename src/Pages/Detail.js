import {
  Button,
  EditIcon,
  Pane,
  TextInputField,
  TextareaField,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import axios from "axios";
import { API } from "../configUrl";
function Detail() {
  const { id } = useParams();
  const [permis, setPermis] = useState(false);
  const [permiss, setPermiss] = useState(false);
  const [plant_name, setPlant_name] = useState();
  const [plant_code, setPlant_code] = useState();
  const [plant_character, setPlant_character] = useState();
  const [distinctive, setDis] = useState();
  const [area, setArea] = useState();
  const [lacate_x, setX] = useState();
  const [locate_y, setY] = useState();
  const [tumbol, setTam] = useState();
  const [amphure, setAmphur] = useState();
  const [province, setProvince] = useState();
  const [age, setAge] = useState();
  const [girth, setGirth] = useState();
  const [height, setHeight] = useState();
  const [statuss, setStatus] = useState();
  const [benefitFoot, setFoot] = useState();
  const [benefitHuman, setHuman] = useState();
  const [benefitAnimal, setAnimal] = useState();
  const [benefitAppliances, setAppliances] = useState();
  const [benefitPesticide, setPesticide] = useState();
  const [aboutTradition, setTradition] = useState();
  const [aboutReligion, setReligion] = useState();
  const [other, setOther] = useState();
  const [nameAdder, setAdderName] = useState();
  const [ageAdder, setAgeAdder] = useState();
  const [addressAdder, setAddress] = useState();
  const [date, setDate] = useState();
  const [qty, setQty] = useState();
  const [plant, setPlant] = useState([]);
  const fetch = async () => {
    try {
      const a = await axios.post(API + "/Plant/detailPlant", {
        id: id,
      });
      const respos = a.data[0];
      setPlant(respos);
      console.log(respos);
      setPermiss(true);
    } catch (error) {}
  };
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    if (permiss) {
      setPlant_name(plant.plant_name);
      setPlant_code(plant.plant_code);
      setPlant_character(plant.plant_character);
      setDis(plant.distinctive);
      setArea(plant.area);
      setX(plant.lacate_x);
      setY(plant.locate_y);
      setTam(plant.tumbol);
      setAmphur(plant.amphure);
      setProvince(plant.province);
      setAge(plant.age);
      setGirth(plant.girth);
      setHeight(plant.height);
      setStatus(plant.statuss);
      setFoot(plant.benefit_foot);
      setHuman(plant.benefit_medicine_human);
      setAnimal(plant.benefit_medicine_animal);
      setAppliances(plant.benefit_appliances);
      setPesticide(plant.benefit_pesticide);
      setTradition(plant.about_tradition);
      setReligion(plant.about_religion);
      setOther(plant.other);
      setAdderName(plant.name_adder);
      setAgeAdder(plant.age_adder);
      setAddress(plant.address_adder);
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      const dae = new Date(plant.date_add)
      const format = dae.toLocaleDateString('TH-th',options)
      setDate(format+ "โดย " + plant.useredit);
      setQty(plant.qty);
    }
  }, [permiss]);

  return (
    <div className="container-md">
      {id}
      <Pane
        backgroundColor={"white"}
        borderRadius={10}
        minHeight={100}
        padding={20}
      >
        <div className="d-flex justify-content-end pr-2">
          <EditIcon
            size={20}
            color="orange500"
            onClick={() => setPermis(!permis)}
            className="ic"
          />
        </div>
        <div></div>
        <form className="m row">
          <div className="col-6">
            <TextInputField
              disabled={!permis}
              label="ชื่อพืช"
              name="plant_name"
              value={plant_name}
              onChange={(e)=>setPlant_name(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextInputField
              disabled={!permis}
              label="รหัสพรรณไม้"
              name="plant_code"
              value={plant_code}
              onChange={(e)=>setPlant_code(e.target.value)}
            />
          </div>
          <div className="col-12 px-2">
            <TextInputField
              disabled={!permis}
              label="ลักษณะวิสัย"
              name="plant_character"
              value={plant_character}
              onChange={(e)=>setPlant_character(e.target.value)}
            />
          </div>
          <div className="col-12 px-2">
            <TextareaField
              disabled={!permis}
              label="ลักษณะเด่นของพืช"
              name="distinctive"
              value={distinctive}
              onChange={(e)=>setDis(e.target.value)}
            />
          </div>
          <div className="col-12 px-2">
            <TextInputField
              disabled={!permis}
              label="บริเวณที่พบ"
              name="area"
              value={area}
              onChange={(e)=>setArea(e.target.value)}
            />
          </div>
          <label className="col-12">แสดงพิกัดตำแหน่งพรรณไม้ (GIS)</label>
          <div className="col-6 px-2">
            <TextInputField
              disabled={!permis}
              label="X"
              value={lacate_x}
              onChange={(e)=>setX(e.target.value)}
              name="lacate_x"
            />
          </div>
          <div className="col-6 px-2">
            <TextInputField
              disabled={!permis}
              label="Y"
              value={locate_y}
              onChange={(e)=>setY(e.target.value)}
              name="locate_y"
            />
          </div>
          <div className="col-3 px-2">
            <TextInputField
              disabled={!permis}
              label="ตำบล/แขวง"
              name="tumbol"
              value={tumbol}
              onChange={(e)=>setTam(e.target.value)}
            />
          </div>
          <div className="col-3 px-2">
            <TextInputField
              disabled={!permis}
              label="อำเภอ/เขต"
              name="amphure"
              value={amphure}
              onChange={(e)=>setAmphur(e.target.value)}
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={true}
              label="จังหวัด"
              name="province"
              value={province}
              onChange={(e)=>setProvince(e.target.value)}
            />
          </div>

          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="อายุประมาณ (ปี)"
              name="age"
              value={age}
              onChange={(e)=>setAge(e.target.value)}
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="เส้นรอบวงลำต้น (เมตร)"
              name="girth"
              value={girth}
              onChange={(e)=>setGirth(e.target.value)}
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="ความสูง (เมตร)"
              name="height"
              value={height}
              onChange={(e)=>setHeight(e.target.value)}
            />
          </div>
          <div className="col-8 px-2">
            <TextInputField disabled={!permis} label="สถานภาพ" name="statuss"   onChange={(e)=>setStatus(e.target.value)} />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="จำนวนที่พบ (ต้น)"
              name="qty"
              value={qty}
              onChange={(e)=>setQty(e.target.value)}
            />
          </div>
          <label className="col-12">
            การใช้ประโยชน์ในท้องถิ่น (ระบุส่วนที่ใช้และวิธีการใช้)
          </label>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="อาหาร"
              name="benefit_foot"
              value={benefitFoot}
              onChange={(e)=>setFoot(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ยารักษาโรค ใช้กับคน"
              name="benefit_medicine_human"
              value={benefitHuman}
              onChange={(e)=>setHuman(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ยารักษาโรค ใช้กับสัตว์"
              name="benefit_medicine_animal"
              onChange={(e)=>setAnimal(e.target.value)}
              value={benefitAnimal}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="เครื่องเรือน เครื่องใช้อื่นๆ"
              name="benefit_appliances"
              value={benefitAppliances}
                onChange={(e)=>setAppliances(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ยาฆ่าแมลง ยาปราบศัตรูพืช"
              name="benefit_pesticide"
              value={benefitPesticide}
              onChange={(e)=>setPesticide(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ความเกี่ยวข้องกับประเพณี วัฒนธรรม"
              name="about_tradition"
              value={aboutTradition}
              onChange={(e)=>setTradition(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ความเกี่ยวข้องกับความเชื่อทางศาสนา"
              name="about_religion"
              value={aboutReligion}
              onChange={(e)=>setReligion(e.target.value)}
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="อื่นๆ (เช่นการเป็นพิษ อันตราย)"
              onChange={(e)=>setOther(e.target.value)}
              name="other"
              value={other}
            />
          </div>
          <div className="col-8 px-2">
            <TextInputField
              disabled={!permis}
              label="ผู้ให้ข้อมูล ชื่อ-สกุล"
              name="name_adder"
              value={nameAdder}
              onChange={(e)=>setAdderName(e.target.value)}
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="อายุ"
              value={ageAdder}
              name="age_adder"
              onChange={(e)=>setAgeAdder(e.target.value)}
            />
          </div>
          <div className="col-12 px-2">
            <TextareaField
              disabled={!permis}
              label="ที่อยู่ผู้ให้ข้อมูล"
              name="address_adder"
              value={addressAdder}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </div>
          <div className="col-12 px-2">
            <TextInputField
              disabled={true}
              label="วันที่เพิ่มข้อมูล"
              name=""
              value={date}
            />
          </div>
          {permis ? (
            <>
              <div className="col-12 px-2">
                <Button width="100%" appearance="primary" intent="success">
                  บันทึก
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </form>
      </Pane>
    </div>
  );
}

export default Detail;
