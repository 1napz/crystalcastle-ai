// ฟังก์ชันจำลองการดึงข้อมูล Token จาก API
async function fetchTokenStatus() {
  // ตัวอย่างข้อมูลจำลอง
  return {
    issued: "2026-07-06 14:30",
    by: "System Admin",
    expiry: "2026-07-13 14:30",
    status: "Active ✅"
  };
}

// ฟังก์ชันอัปเดตข้อมูลบนการ์ด
async function updateDashboardCard() {
  const tokenData = await fetchTokenStatus();

  document.getElementById("token-issued").textContent = tokenData.issued;
  document.getElementById("token-by").textContent = tokenData.by;
  document.getElementById("token-expiry").textContent = tokenData.expiry;
  document.getElementById("token-status").textContent = tokenData.status;
}

// เรียกใช้งานเมื่อโหลดหน้าเว็บ
window.onload = updateDashboardCard;

// ฟังก์ชันสำหรับปุ่ม Generate Token
function redirectToToken() {
  alert("Generating new token...");
  // สามารถเชื่อมต่อ API จริงได้ที่นี่
}
