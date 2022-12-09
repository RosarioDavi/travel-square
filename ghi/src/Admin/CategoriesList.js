import Table from 'react-bootstrap/Table'
import { useGetTokenQuery } from '../store/authApi';
import { useGetCategoriesQuery } from '../store/adminApi';
import { AddCategoryModal } from './AddCategoryModal';


export function CategoriesList() {
    const { data: tokenData} = useGetTokenQuery();
    const { data: categoriesData, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

    return (
        <>
        <div className='container' style={{mt:'5rem'}}>
            <div className='d-flex justify-content-center'>
                <div className='row'>
                    <div className='col'>
                        <h3>There are currently {categoriesData.length} categories available.</h3>
                        <AddCategoryModal />
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
        </>
    )
}
