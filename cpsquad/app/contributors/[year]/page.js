"use client";
import React from "react";
import { useParams } from "next/navigation";
import ContributorsYearView from "../../../component/ContributorsYearView/ContributorsYearView.jsx";

export default function ContributorsYearPage() {
  const params = useParams();
  const year = params.year;

  return <ContributorsYearView year={year} />;
}
