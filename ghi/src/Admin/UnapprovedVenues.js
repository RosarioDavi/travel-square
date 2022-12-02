import { useState, useEffect } from "react";
import { useGetAccountsQuery } from "../store/accountsApi";

export function UnapprovedVenues() {
    const { data: tokenData} = useGetAccountsQuery();
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const UnapprovedVenuesUrl = 'http://localhost:8000/api/venues/unapproved/'
    })
}
