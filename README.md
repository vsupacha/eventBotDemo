# EventBotDemo
โค้ดตัวอย่างสำหรับสร้าง LINE bot สำหรับกิจกรรม

## Technology Stack
ระบบซอฟต์แวร์ใช้องค์ประกอบดังนี้

* Docker container
* Backend: Node.js 
    * express เป็น web framework
    * mongoose เชื่อมต่อฐานข้อมูล
    * @line/bot-sdk สร้าง webhook
    * ngrok สร้าง tunnel สำหรับให้บริการ
* Database: MongoDB
* Frontend: vanilla JavaScript
    * LIFF สำหรับเชื่อมต่อ LINE account
    * OnsenUI สร้าง user interface

## Software architecture
สถาปัตยกรรมแบ่งออกเป็น 3 ส่วน

1. LINE webhook รองรับ message และ event ที่ส่งจากเซิร์ฟเวอร์ LINE
2. frontend LIFF เชื่อมต่อเว็บบริการ 4 ส่วน
    * เว็บบริการ /api/agenda
    * เว็บบริการ /api/info
    * เว็บบริการ /api/map
    * เว็บบริการ /api/rally
3. frontend dashboard  

