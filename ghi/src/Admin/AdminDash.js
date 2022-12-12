import { useState, useEffect } from "react";
import { useGetAccountsQuery } from "../store/accountsApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddCategoryModal from "./AddCategoryModal";
import CategoriesList from "./CategoriesList";
import UnapprovedVenues from "./UnapprovedVenues";
import UpdateVenueModal from "./UpdateVenueModal";
import DeleteVenueModal from "./DeleteVenueModal";

export function AdminDash() {
    const { data: tokenData} = useGetAccountsQuery();

    return (
        <>
            <Container>
                <Row>
                    <AddCategoryModal />
                </Row>
                <Row>
                    <CategoriesList />
                </Row>
                <Row>
                    <UnapprovedVenues />
                </Row>
                <Row>
                    <UpdateVenueModal />
                </Row>
                <Row>
                    <DeleteVenueModal />
                </Row>
            </Container>
        </>
    )
}

export default AdminDash;
