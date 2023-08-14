import { EditIcon, Pane, TextInputField, TextareaField } from "evergreen-ui";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
function DetailTwo() {
  const { id } = useParams();
  const [permis, setPermis] = useState(false);
  return (
    <div className="container-md">
      <Pane
        backgroundColor={"white"}
        borderRadius={10}
        minHeight={100}
        padding={20}
      >
        <div>
          
        </div>
        <form className="m row">
          <div className="col-6">
            <TextInputField
              disabled={!permis}
              label="ชื่อพืช"
              name="plant_name"
            />
          </div>
          <div className="col-6 px-2">
            <TextInputField
              disabled={!permis}
              label="รหัสพรรณไม้"
              name="plant_code"
            />
          </div>
          <div className="col-12 px-2">
            <TextInputField
              disabled={!permis}
              label="ลักษณะวิสัย"
              name="plant_character"
            />
          </div>
          <div className="col-12 px-2">
            <TextareaField
              disabled={!permis}
              label="ลักษณะเด่นของพืช"
              name="distinctive"
            />
          </div>
          <div className="col-12 px-2">
            <TextInputField
              disabled={!permis}
              label="บริเวณที่พบ"
              name="area"
            />
          </div>
          <label className="col-12">แสดงพิกัดตำแหน่งพรรณไม้ (GIS)</label>
          <div className="col-6 px-2">
            <TextInputField disabled={!permis} label="X" name="lacate_x" />
          </div>
          <div className="col-6 px-2">
            <TextInputField disabled={!permis} label="Y" name="locate_y" />
          </div>
          <div className="col-3 px-2">
            <TextInputField
              disabled={!permis}
              label="ตำบล/แขวง"
              name="tumbol"
            />
          </div>
          <div className="col-3 px-2">
            <TextInputField
              disabled={!permis}
              label="อำเภอ/เขต"
              name="amphure"
            />
          </div>
          <div className="col-3 px-2">
            <TextInputField
              disabled={!permis}
              label="จังหวัด"
              name="province"
            />
          </div>
          <div className="col-3 px-2">
            <TextInputField
              disabled={!permis}
              label="รหัสไปรษณีย์"
              name="zipcode"
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="อายุประมาณ (ปี)"
              name="age"
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="เส้นรอบวงลำต้น (เมตร)"
              name="girth"
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="ความสูง (เมตร)"
              name="height"
            />
          </div>
          <div className="col-8 px-2">
            <TextInputField disabled={!permis} label="สถานภาพ" name="statuss" />
          </div>
          <div className="col-4 px-2">
            <TextInputField
              disabled={!permis}
              label="จำนวนที่พบ (ต้น)"
              name="qty"
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
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ยารักษาโรค ใช้กับคน"
              name="benefit_medicine_human"
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ยารักษาโรค ใช้กับสัตว์"
              name="benefit_medicine_animal"
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="เครื่องเรือน เครื่องใช้อื่นๆ"
              name="benefit_appliances"
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ยาฆ่าแมลง ยาปราบศัตรูพืช"
              name="benefit_pesticide"
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ความเกี่ยวข้องกับประเพณี วัฒนธรรม"
              name="about_tradition"
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="ความเกี่ยวข้องกับความเชื่อทางศาสนา"
              name="about_religion"
            />
          </div>
          <div className="col-6 px-2">
            <TextareaField
              disabled={!permis}
              label="อื่นๆ (เช่นการเป็นพิษ อันตราย)"
              name="other"
            />
          </div>
          <div className="col-8 px-2">
            <TextInputField
              disabled={!permis}
              label="ผู้ให้ข้อมูล ชื่อ-สกุล"
              name="name_adder"
            />
          </div>
          <div className="col-4 px-2">
            <TextInputField disabled={!permis} label="อายุ" name="age_adder" />
          </div>
          <div className="col-12 px-2">
            <TextareaField
              disabled={!permis}
              label="ที่อยู่ผู้ให้ข้อมูล"
              name="address_adder"
            />
          </div>
          <div className="col-6 px-2"></div>
        </form>
      </Pane>
    </div>
  );
}

export default DetailTwo;
