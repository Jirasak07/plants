import axios from 'axios';
import { Image, Pane, TextInputField, TextareaField } from 'evergreen-ui';
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import {API} from '../configUrl'

function ActivDetail() {
    const { id } = useParams();
    const [img,setImg] = useState([])
    const [detail,setDetail] = useState([])
    const [chkfetch,setChkFetch] = useState(false)

    const fetch = async()=>{
        try {
            const fetchh = await axios.post(API+"/News/getImgActiv",{
                id:id
            })
            const fetchhDetail = await axios.post(API+"/News/DetailActiv",{
                id:id
            })
            setImg(fetchh.data)
            setDetail(fetchhDetail.data[0])
            console.log(fetchhDetail)
            setChkFetch(true)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetch()
    },[])
    useEffect(()=>{
    },[chkfetch])
    const formatDate = (val) => {
        const date = new Date(val); // วันที่ปัจจุบัน
    
        // กำหนดภาษาเป้าหมายเป็นไทย
        const options = { year: "numeric", month: "long", day: "numeric" };
        const thaiDate = date.toLocaleDateString("th-TH", options);
        return thaiDate;
      };
  return (
    <div className='container-lg' >
      <Pane borderRadius={5} padding={10} className="bg-white">
        <div>
            <Carousel
            autoPlay={true}
            infiniteLoop={true}
            width={"100%"}
            centerSlidePercentage={50}
            stopOnHover={true}
            centerMode={true}
            dynamicHeight={true}
            >
    {Array.isArray(img)&& img.map((i)=>(
        <Image src={API+"/"+i.img_path} alt='' maxHeight={"400px"} />
    ))}
            </Carousel>
        </div>
        <Pane>
            <TextInputField label="หัวข้อกิจกรรม" value={detail.ac_title} readOnly />
            <TextareaField inputHeight={200} label="รายละเอียดกิจกรรม" value={detail.ac_detail} readOnly />
            <TextInputField label="วันที่อัพเดท" value={formatDate(detail.ac_date)} />

          {detail.ac_file === '-'?<></>:<a className='text-primary' target='_blank' href={API+"/"+detail.ac_file} rel='noreferrer' >ไฟล์เอกสารเพิ่มเติม...</a>}
        </Pane>
      </Pane>
    </div>
  )
}

export default ActivDetail
