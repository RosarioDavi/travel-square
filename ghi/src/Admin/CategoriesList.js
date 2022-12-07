import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from "react";
import { useGetTokenQuery } from '../store/authApi';

export function CategoriesList() {
    const { data: tokenData} = useGetTokenQuery();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData()
        }, []);

    const fetchData = async () => {
            const CategoriesUrl = 'http://localhost:8000/api/categories/'
            const response = await fetch(CategoriesUrl);
            const newData = await response.json();
            setCategories(newData);
    }

    return (
        <>
        <div className='container' style={{mt:'5rem'}}>
            <div className='d-flex justify-content-center'>
                <div className='row'>
                    <div className='col'>
                        <Button>Add a Category</Button>
                        <Table striped bordered variant='dark'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => {
                                    return (
                                        <tr key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.category_name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
