'use client'

import { nextServer } from "@/app/lib/api"
import { getBooks } from "@/app/lib/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Recommended(){
    const { data, isError, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (isError) {
      toast.error("Sorry, something went wrong, please try again");
    }
  }, [isError]);
  console.log('recommended books data:', data);
  return <><p>Data</p></>
}