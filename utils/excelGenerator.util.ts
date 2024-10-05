import { Workbook } from "exceljs";
import { Form } from "../src/models/form.model";

export const exportFormsToExcel = (forms: Form[]) => {
  try {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("الاعضاء");

    worksheet.columns = [
      { header: "ID", key: "_id", width: 30 },
      { header: "رقم العضوية", key: "memberId", width: 30 },
      { header: "الاسم", key: "username", width: 30 },
      { header: "الرقم القومي", key: "id", width: 30 },
      { header: "تاريخ الميلاد", key: "birth_date", width: 30 },
      { header: "النوع", key: "gender", width: 30 },
      { header: "الديانة", key: "religion", width: 30 },
      { header: "الموبايل", key: "phoneNumber", width: 30 },
      { header: "البريد الالكترونى", key: "email", width: 30 },
      { header: "المحافظة", key: "government", width: 30 },
      { header: "المركز", key: "department", width: 30 },
      { header: "مصرى مقيم بالخارج", key: "outsider", width: 30 },
      { header: "التخصص", key: "specialization", width: 30 },
      { header: "المؤهل", key: "degree", width: 30 },
      { header: "تفاصيل المؤهل", key: "degree_description", width: 30 },
      { header: "اعلى درجة علمية", key: "highest_degree", width: 30 },
      { header: "المهنة", key: "profession", width: 30 },
      { header: "النقابة", key: "union", width: 30 },
      { header: "محل العمل", key: "work_place", width: 30 },
      { header: "مجال العمل", key: "work_sector", width: 30 },
      { header: "الوظيفة", key: "position", width: 30 },
      { header: "المجالات", key: "fields", width: 30 },
      { header: "كيف تم التعرف على الحزب", key: "knew", width: 30 },
      { header: "احزاب سابقة", key: "party_name", width: 30 },
      { header: "انتخابات سابقة", key: "election_candidate", width: 30 },
      { header: "تفاصيل الانتخابات السابقة", key: "election_data", width: 30 },
      { header: "تم التجديد", key: "renewed", width: 30 },
      { header: "تاريخ التسجيل", key: "createdAt", width: 30 }
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFBFBFBF" } 
      };
      cell.font = {
        bold: true 
      };
    });

    forms.forEach((form) => {
      let formToAdd = {
        ...form.toObject(),
        renewed: form.renewed ? "نعم" : "لا"
      };
      worksheet.addRow(formToAdd);
    });

    return workbook;
  } catch (error) {
    console.error("Error exporting users to Excel:", error);
    return {
      error: { message: "An error occurred while exporting the data." }
    };
  }
};
