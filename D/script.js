function appendNumber(number) {
    let display = document.getElementById("display");
    if (display.innerText === "ป้อนรหัสผ่าน") {
        display.innerText = ""; // ล้างข้อความเริ่มต้นเมื่อเริ่มพิมพ์
    }
    display.innerText += number;
    display.style.textAlign = "right"; // เมื่อเริ่มพิมพ์ ให้ข้อความชิดขวา
}

function clearInput() {
    let display = document.getElementById("display");
    display.innerText = "ป้อนรหัสผ่าน";
    display.style.textAlign = "center"; // ให้กลับไปอยู่ตรงกลาง
}

function deleteLast() {
    let display = document.getElementById("display");
    let text = display.innerText;
    if (text.length > 0 && text !== "ป้อนรหัสผ่าน") {
        display.innerText = text.slice(0, -1);
        if (display.innerText === "") {
            display.innerText = "ป้อนรหัสผ่าน";
            display.style.textAlign = "center"; // กลับไปอยู่ตรงกลาง
        }
    }
}

function checkPassword() {
    let display = document.getElementById("display");
    let userPassword = display.innerText;

    if (userPassword === "ป้อนรหัสผ่าน" || userPassword === "") {
        document.getElementById("message").innerText = "⚠️ โปรดป้อนรหัส!";
        return;
    }

    fetch("password.txt")
        .then(response => response.text())
        .then(correctPassword => {
            correctPassword = correctPassword.trim();
            let savedPassword = localStorage.getItem("savedPassword");

            if (savedPassword && savedPassword === correctPassword) {
                window.location.href = "welcome.html"; // ถ้าเคยล็อกอินแล้ว ให้เข้าได้เลย
                return;
            }

            if (userPassword === correctPassword) {
                localStorage.setItem("savedPassword", userPassword); // บันทึกรหัสผ่าน
                window.location.href = "welcome.html";
            } else {
                document.getElementById("message").innerHTML = "❌ รหัสผ่านผิด!";
                clearInput();
            }
        })
        .catch(error => console.error("เกิดข้อผิดพลาด: ", error));
}

// โหลดหน้าเว็บและตรวจสอบรหัสที่บันทึกไว้
window.onload = function () {
    let display = document.getElementById("display");
    fetch("password.txt")
        .then(response => response.text())
        .then(correctPassword => {
            correctPassword = correctPassword.trim();
            let savedPassword = localStorage.getItem("savedPassword");

            if (savedPassword && savedPassword === correctPassword) {
                window.location.href = "welcome.html"; // ถ้ารหัสตรงกัน ให้เข้าทันที
            } else {
                localStorage.removeItem("savedPassword"); // ถ้ารหัสถูกเปลี่ยน ให้ลบรหัสที่บันทึกไว้
            }
        })
        .catch(error => console.error("เกิดข้อผิดพลาด: ", error));

    display.innerText = "ป้อนรหัสผ่าน";
    display.style.textAlign = "center"; // ให้ข้อความอยู่ตรงกลาง
};

