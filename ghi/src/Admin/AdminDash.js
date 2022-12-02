import { useState, useEffect } from "react";
import { useGetAccountsQuery } from "../store/accountsApi";

export function AdminDash() {
    const { data: tokenData} = useGetAccountsQuery();
}
