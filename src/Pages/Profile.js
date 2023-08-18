import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../configUrl";
import { Button, Dialog, EditIcon, Pane, TextInputField } from "evergreen-ui";
import Swal from "sweetalert2";

function Profile() {
  const [per, setPer] = useState(false);
  const [profile, setProfile] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [currUsername, setCurrUsername] = useState();
  const [currName, setCurrName] = useState();
  const [currOga, setCurrOga] = useState();
  const [currTell, setCurrTell] = useState();
  const [currCiti, setCurrCiti] = useState();
  const [currRole, setCurrRole] = useState();
  const [allowEdit, setAllow] = useState(false);
  const [newUsername, setNewUsername] = useState();
  const [pass, setPass] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newNewPassword, setNewNewPassword] = useState();
  const getMyProfile = async () => {
    try {
      const post = await axios.post(API + "/User/ShowProfile", {
        id: user_id,
      });
      const res = post.data[0];
      setProfile(res);
      setCurrCiti(res.citizen_id);
      setCurrName(res.name);
      setCurrOga(res.organization);
      setCurrTell(res.tell_number);
      setCurrUsername(res.username);
      setNewUsername(res.username);
      const rolee = res.user_role === 1 ? "Admin" : "User";
      setCurrRole(rolee);
      setPer(true);
    } catch (error) {}
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  useEffect(() => {
    console.log("fetch success");
  }, [per]);
  const changePass = () => {
    axios
      .post(API + "/User/ChangePass", {
        username: newUsername,
        id: localStorage.getItem("user_id"),
        newpass: newPassword,
        oldpass: pass,
      })
      .then((res) => {
        const r = res.data;

        if (r === "success") {
          Swal.fire({
            icon: "success",
            title: "Success !!",
          }).then((rd) => {
            window.location.reload();
          });
        } else if (r === "error") {
          Swal.fire({
            icon: "error",
            title: "ไม่สำเร็จ",
          });
        }
      });
  };
  const editUser = () => {
    axios
      .post(API + "/User/EditProfile", {
        username: currUsername,
        name: currName,
        organize: currOga,
        tell_number: currTell,
        citizen: currCiti,
        id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        const resp = res.data;
        if (resp === "success") {
          Swal.fire({
            icon: "success",
            title: "Success !!",
          }).then((dsd) => {
            window.location.reload();
          });
        }
      });
  };
  return (
    <div className="container-md d-flex justify-content-center bg-danger" style={{minHeight:'calc(100vh - 80px) '}} >
      <Pane
        backgroundColor="white"
        className="profile"
        padding={10}
        borderRadius={20}
      >
        <EditIcon
          size={20}
          color="orange500"
          className="ic ed"
          onClick={() => setAllow(!allowEdit)}
        />
        <TextInputField
          label="ชื่อผู้ใช้"
          value={currUsername}
          disabled={!allowEdit}
          readOnly={!allowEdit}
          width="100%"
          onChange={(e) => setCurrUsername(e.target.value)}
        />
        <TextInputField
          label="name"
          value={currName}
          disabled={!allowEdit}
          readOnly={!allowEdit}
          onChange={(e) => setCurrName(e.target.value)}
          width="100%"
        />
        <TextInputField
          label="สังกัด"
          width="100%"
          value={currOga}
          disabled={!allowEdit}
          readOnly={!allowEdit}
          onChange={(e) => setCurrOga(e.target.value)}
        />
        <TextInputField
          label="เบอร์โทร"
          value={currTell}
          disabled={!allowEdit}
          width="100%"
          readOnly={!allowEdit}
          onChange={(e) => setCurrTell(e.target.value)}
        />
        <TextInputField
          label="เลขบัตร"
          width="100%"
          value={currCiti}
          disabled={!allowEdit}
          readOnly={!allowEdit}
          onChange={(e) => setCurrCiti(e.target.value)}
        />
        <TextInputField label="สิทธิ์" value={currRole} disabled width="100%" />
        {allowEdit ? (
          <>
            <Button
              width="100%"
              appearance="primary"
              intent="success"
              onClick={editUser}
            >
              บันทึก
            </Button>
          </>
        ) : (
          <></>
        )}
        <Button
          appearance="minimal"
          intent="success"
          onClick={() => setIsShow(true)}
        >
          เปลี่ยนรหัสผ่าน
        </Button>
        <Dialog
          hasFooter={false}
          isShown={isShow}
          onCloseComplete={() => setIsShow(false)}
        >
          <TextInputField
            value={newUsername}
            label="ชื่อผู้ใช้"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <TextInputField
            value={pass}
            label="รหัสผ่านเดิม"
            onChange={(e) => setPass(e.target.value)}
          />
          <TextInputField
            label="รหัสผ่านใหม่"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextInputField
            label="ยืนยันรหัสผ่านใหม่"
            value={newNewPassword}
            onChange={(e) => setNewNewPassword(e.target.value)}
          />
          <Button
            appearance="primary"
            width="100%"
            intent="success"
            onClick={changePass}
          >
            บันทึก
          </Button>
        </Dialog>
      </Pane>
    </div>
  );
}

export default Profile;
