import React, { useEffect, useState } from "react";
import { API } from "../configUrl";
import axios from "axios";
import { Button, FilePicker, Image, Pane } from "evergreen-ui";
import Swal from "sweetalert2";

function EditImage({ id }) {
  const [permissimg, setPermissimg] = useState(false);
  const [imgLeaf, setImgLeaf] = useState(null);
  const [imgFlower, setImgFlower] = useState(null);
  const [imgTrunk, setImgTrunk] = useState(null);
  const [imgFruit, setImgFruit] = useState(null);
  const [imgLeafs, setImgLeafs] = useState(null);
  const [imgFlowers, setImgFlowers] = useState(null);
  const [imgTrunks, setImgTrunks] = useState(null);
  const [imgFruits, setImgFruits] = useState(null);
  const [dataImg, setDataImg] = useState([]);
  const fetchimg = async () => {
    try {
      const a = await axios.post(API + "/Plant/ShowImage", {
        id: id,
      });
      const respos = a.data;
      setDataImg(respos);
      respos.forEach((i) => {
        const img = i.image_name;
        if (img.toLowerCase().includes("leaf")) {
          setImgLeaf(API + "/" + img);
        } else if (img.toLowerCase().includes("trunk")) {
          setImgTrunk(API + "/" + img);
        } else if (img.toLowerCase().includes("flower")) {
          setImgFlower(API + "/" + img);
        } else if (img.toLowerCase().includes("fruit")) {
          setImgFruit(API + "/" + img);
        }
      });

      console.log(respos);
      setPermissimg(true);
    } catch (error) {}
  };
  useEffect(() => {}, [permissimg]);
  useEffect(() => {
    fetchimg();
  }, []);
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
          setImgLeaf(URL.createObjectURL(file));
          setImgLeafs(file);
        } else if (val === 2) {
          setImgTrunk(URL.createObjectURL(file));
          setImgTrunks(file);
        } else if (val === 3) {
          setImgFlower(URL.createObjectURL(file));
          setImgFlowers(file);
        } else {
          setImgFruit(URL.createObjectURL(file));
          setImgFruits(file);
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
  const handleUpload = (val, ids, name) => {
    if (val) {
      const formData = new FormData();
      formData.append("file", val);
      formData.append("name", ids + name);
      formData.append("user_id", 1);
      formData.append("plant_id", ids);
      axios
        .post(API + "/Plant/updateImage", formData)
        .then((response) => {
          console.log("Upload successful:");
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };
  const submit = () => {
    if (id) {
      (async () => {
        try {
          if (imgLeafs) {
            handleUpload(imgLeafs, id, "leaf");
          } else {
            console.log("not Leaf");
          }
          if (imgFlowers) {
            handleUpload(imgFlowers, id, "flower");
          } else {
            console.log("not Floer");
          }
          if (imgTrunks) {
            handleUpload(imgTrunks, id, "trunk");
          } else {
            console.log("not trunk");
          }
          if (imgFruits) {
            handleUpload(imgFruits, id, "fruit");
          } else {
            console.log("not fruit");
          }
        } catch (error) {}
      })().then((df)=>{
        Swal.fire({
            icon:'success',
            title:'Success !!'
        }).then((d)=>{
            window.location.reload()
        })
      })
    }
  };

  return (
    <div>
      <div
        className="container-img justify-content-center d-flex row flex-wrap"
        style={{ gap: "10px" }}
      >
        <Pane>
          <FilePicker
            onChange={(e) => handleFileChange(e, 1)}
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
          {imgLeaf === null ? (
            <></>
          ) : (
            <>
              <Image src={imgLeaf} alt="Preview" width="100%" />
            </>
          )}
        </Pane>
        <Pane>
          <FilePicker
            onChange={(e) => handleFileChange(e, 2)}
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
          {imgTrunk === null ? (
            <></>
          ) : (
            <>
              <Image src={imgTrunk} alt="Preview" width="100%" />
            </>
          )}
        </Pane>
        <Pane>
          <FilePicker
            onChange={(e) => handleFileChange(e, 3)}
            placeholder="เลือกรูปภาพผล"
            accept=".png, .jpg, .jpeg"
            validate={(file) => {
              const maxFileSize = 5 * 1024 * 1024; // 5 MB
              if (file.size > maxFileSize) {
                return "File size exceeds the limit";
              }
              return null;
            }}
          />{" "}
          {imgFlower === null ? (
            <></>
          ) : (
            <>
              <Image src={imgFlower} alt="Preview" width="100%" />
            </>
          )}
        </Pane>
        <Pane>
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
          {imgFruit === null ? (
            <></>
          ) : (
            <>
              <Image src={imgFruit} alt="Preview" width="100%" />
            </>
          )}
        </Pane>
      </div>
      <div className="mt-3  d-flex">
        <Button
          width="50%"
          appearance="primary"
          intent="success"
          onClick={() => {
            submit();
          }}
        >
          บันทึก
        </Button>
        <Button width="50%" appearance="minimal" intent="danger">
          บันทึก
        </Button>
      </div>
    </div>
  );
}

export default EditImage;
