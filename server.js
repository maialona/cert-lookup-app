import express from "express";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// 靜態資源：前端畫面和證書資料夾
app.use(express.static(path.join(__dirname, "public")));
app.use("/certificates", express.static(path.join(__dirname, "certificates")));

// 載入學員資料
const records = JSON.parse(
  readFileSync(path.join(__dirname, "data", "records.json"))
);

// 查詢 API
app.get("/api/certificate", (req, res) => {
  const id = req.query.id?.toUpperCase().trim();
  const record = records.find((r) => r.id === id);

  if (record) {
    res.json({
      success: true,
      name: record.name,
      url: `/certificates/${record.filename}`,
    });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
