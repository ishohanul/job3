import { setCompanies } from "@/redux/companyslice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log("Fetching companies from:", `${COMPANY_API_ENDPOINT}/get`);
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`);
        console.log("Companies API response:", res.data);
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
          console.log("Companies dispatched to Redux:", res.data.companies);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        console.error("Error response:", error.response?.data);
      }
    };
    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
