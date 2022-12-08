import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from "react";
import { useGetTokenQuery } from '../store/authApi';
import { useGetCategoriesQuery } from '../store/adminApi';

export function CategoriesList() {
    const { data: tokenData} = useGetTokenQuery();
    const { data: categoriesData, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

    return (
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
                                {categoriesData.map(category => {
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
    )
}
