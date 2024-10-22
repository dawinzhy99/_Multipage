import "./Home.css";
import React from "react";
function Home() {
  return (
    <>
    <div className="
    home-container grid grid-cols-5 gap-2 h-screen p-2 border-1 rounded">

    <div className="col-start-1 col-end-3 container flex flex-col items-center">
      <div className="card">

      <img className="w-64 rounded-full rounded border-4 border-black " src="https://img5.pic.in.th/file/secure-sv1/Img-Resume.png" alt="" />
      </div>
      <div className="card-body text-left">
        <div className="">
          <h2 className="text-2xl m-2">ข้อมูลส่วนตัว</h2>
          <ul className="list-inside list-disc">
          <li>ชื่อ-สกุล: สุธา ทองคง</li>
          <li>ชื่อเล่น: โอ๊ต</li>
          <li>รหัสนักศึกษา: 66025690</li> 
          <li>อายุ: 30 ปี </li>
          <li>วันเกิด: 10 Dec 1993</li> 
          <li>อาชีพ: นักศึกษา </li>
          <li><a href="https://www.facebook.com/dawinzhy99" className="link link-hover">Facebook</a></li>
          <li><a href="https://www.instagram.com/dawinzhy99/" className="link link-hover">Instagram</a></li>
          <li><a href="mailto:sutha.tho@spumail.net" className="link link-hover">Email</a></li>
          </ul>
          </div>
      </div>
        
    </div>
      
      

    <div className="col-start-3 col-end-6 card mr-1">
        <div className="title text-4xl mt-2 badge badge-lg bg-black text-white p-10">
          Education
          
        </div>

        <div className="card-body p-2">
          <div className="border-1 border-black bg-light rounded p-3">
          <span className="text-xl">
          ปัจจุบันกำลังศึกษาอยู่ที่มหาลัยศรีปทุม
          </span>
          
          <div className="">
            <span className="text-lg" >
            คณะเทคโนโลยีสารสนเทศ <br/>
            </span>
            <span className="" style={{}}>
              สาขาวิทยาการคอมพิวเตอร์และนวัฒนกรรมการพัฒนาซอฟต์แวร์
            </span>
          </div>
          </div>
        </div>
        <div className="title text-4xl mt-2 badge badge-lg bg-black text-white p-10">
          Work Experience
          </div>

        <div className="card-body p-2">
          <div className="border-1 border-black bg-light rounded p-3">
            <span className="text-2xl">October 2016 - November 2019</span><br/>
            <span className="text-xl">Work at
            <a href="www.matix.co.jp" className="link link-hover btn bg-light text-xl p-2 ml-2">Matix.co.jp</a>
            </span>
          </div>
          </div>
    </div>

    
    </div>
    </>
  );
}

export default Home;
