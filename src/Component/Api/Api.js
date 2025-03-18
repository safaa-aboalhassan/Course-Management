import axios from "axios";

const BASE_URL = "https://faux-api.com/api/v1/create_8787734745312883";

// ************************************************************
//  جلب كل البيانات
export const getAllData = async () => {
 const response = await axios.get(BASE_URL);
  return response.data.result || [];

};
// ************************************************************
// دالة الاضافة
export const createData = async (newCourse) => {
 const response = await axios.post(BASE_URL, newCourse, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("✅ استجابة الـ API:", response.data);
  return response.data;

};
// ************************************************************
// تحديث البيانات
export const updateData = async (id, updatedCourse) => {
const response = await axios.put(`${BASE_URL}/${id}`, updatedCourse, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;

};
// ************************************************************
// دالة الحذف
export const deleteData = async (id) => {
const response = await axios.delete(`${BASE_URL}/${id}`);
  if (response.status !== 200) {
    console.log("Error in Api");
  }

  return true;

};