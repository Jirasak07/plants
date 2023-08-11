import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [data, setData] = useState([]);
  const fetch = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
    );
    console.log(response.data);
    setData(response.data);
  };
  return (
    <div className="bg-white container">
      <div className="btn btn-success" onClick={() => fetch()}>
        Enter
      </div>
      {data.map((i) => (
        <div>
          {i.id} {i.name_th}
          {i.amphure.map((a)=>(
            <div>- {a.id} {a.name_th} 
            {a.tambon.map((t)=>(
                <div>- - {t.id} {t.name_th} {t.zip_code} </div>
            ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Test;
