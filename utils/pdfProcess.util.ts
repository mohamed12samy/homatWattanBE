import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import path from "path";
import axios from "axios";
import { Form } from "../src/models/form.model";
import QRCode from "qrcode";

const fontKit = require("@pdf-lib/fontkit");
export const generatePdfForMembers = async (member : Form) => {
  //تحميل ملف PDF
  const pdfPath = path.resolve(__dirname, "../src/assets/BC1.pdf");
  const fontPath = path.resolve(
    __dirname,
    "../src/assets/NotoSansArabic_Condensed-Regular.ttf"
  );
  //const outputFilePath = path.resolve(__dirname, "../src/assets/output.pdf");
  const signature = path.resolve(__dirname, "../src/assets/signature.jpg");

  // تحميل ملف PDF والخط
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const fontBytes = fs.readFileSync(fontPath);

  // تحميل ملف PDF باستخدام pdf-lib
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontKit);
  // تضمين الخط العربي
  const arabicFont = await pdfDoc.embedFont(fontBytes);

  // استخراج الصفحة الأولى لتعديلها
  const page = pdfDoc.getPage(0);

  // إعداد النصوص الجديدة
  const name = member.username;
  const idNumber = member.id;
  const governorate = member.government;
  const endsAt = getEndOfYearDate();
  const adj = "عضو";
  const memberId = member.memberId;
  const profilePic = member.profilePictureLink;

  const fontSize : number = 8;
  const rightMargin : number = 57.137;

  const response = await axios.get<ArrayBuffer>(
    profilePic,
    { responseType: "arraybuffer" }
  );

  const imageBuffer: ArrayBuffer = response.data;
  const embeddedImage: any = await pdfDoc.embedPng(imageBuffer);
  const { width, height } = embeddedImage.scale(0.02);
  page.drawImage(embeddedImage, {
    x: 21.5 , 
    y: 50, 
    width : 54,
    height:70,
  });

  const imageBytes = fs.readFileSync(signature);
  const image = await pdfDoc.embedJpg(imageBytes); 
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: 100,
    height: 50
  });

  page.drawText(name, {
    x: page.getWidth() - arabicFont.widthOfTextAtSize(name, 8) - rightMargin /*165*/,
    y: 89,
    size: fontSize,
    font: arabicFont,
    color: rgb(0, 0, 0)
  });

  page.drawText(adj, {
    x: page.getWidth() - arabicFont.widthOfTextAtSize(adj, 8) - rightMargin /*185*/,
    y: 75,
    size: fontSize,
    font: arabicFont,
    color: rgb(0, 0, 0)
  });

  page.drawText(memberId, {
    x:
      /*165*/ page.getWidth() -
      arabicFont.widthOfTextAtSize(memberId, 8) -
      rightMargin,
    y: 60,
    size: fontSize,
    font: arabicFont,
    color: rgb(0, 0, 0)
  });

  page.drawText(idNumber, {
    x:
      page.getWidth() -
      arabicFont.widthOfTextAtSize(idNumber, 8) -
      rightMargin /*145*/,
    y: 45,
    size: fontSize,
    font: arabicFont,
    color: rgb(0, 0, 0)
  });

  page.drawText(governorate, {
    x:
      /*180*/ page.getWidth() -
      arabicFont.widthOfTextAtSize(governorate, 8) -
      rightMargin,
    y: 29,
    size: fontSize,
    font: arabicFont,
    color: rgb(0, 0, 0)
  });

  page.drawText(endsAt, {
    x:
      page.getWidth() -
      arabicFont.widthOfTextAtSize(endsAt, 8) -
      rightMargin /*165*/,
    y: 15,
    size: fontSize,
    font: arabicFont,
    color: rgb(0, 0, 0)
  });




  const qrCodeData = "https://www.membersofhumatalwatan.com/";
  const qrCodeImageUrl = await QRCode.toDataURL(qrCodeData,{
    color: {
      dark: "#FFFFFF", // White data
      light: "#23539F", // Transparent background
    },
  });
  const qrCodeImageBytes = Buffer.from(
    qrCodeImageUrl.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const qrCodeImage = await pdfDoc.embedPng(qrCodeImageBytes);

  // Step 4: Add the QR code to the first page of the PDF
  const page2 = pdfDoc.getPage(1);
  const sc = qrCodeImage.scale(0.3); // Scale the QR code image
  page2.drawImage(qrCodeImage, {
    x: 9,
    y: 4, // Adjust the position
    width:sc.width,
    height:sc.height,
  });

  // حفظ الملف بعد التعديل
  const pdfBytes = await pdfDoc.save();
  //fs.writeFileSync(outputFilePath, pdfBytes);
  return { fileName:memberId+".pdf", content: pdfBytes };
  //console.log("تم تعبئة البيانات داخل ملف PDF بنجاح");
};


const getEndOfYearDate = () => {
  const endOfYear = new Date(new Date().getFullYear(), 11, 31);
  const day = String(endOfYear.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(endOfYear.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = endOfYear.getFullYear();

  return `${day}-${month}-${year}`;
};

