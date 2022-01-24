import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { getCategoryApi } from '../../api/taskCateApi';
import CategoriesForm from './CategoriesForm';

function Categories(props) {

    const [cateList, setCateList] = React.useState([]);

    const token = useSelector(state => state.user.token);

    React.useEffect(() => {
        const fetchCateList = async () => {
            try {
                const param = {

                }
                const response = await getCategoryApi(param, token.token);
                if (response && response.status === 200) {
                    setCateList(response.data.items)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCateList();
    }, []);

    return (
        <div>
            <div className="container">
                <Typography variant="h4" gutterBottom component="div" style={{ color: "#1976d2" }}>
                    Categories
                </Typography>
                <CategoriesForm cateList={cateList} />
            </div>
        </div>
    );
}

export default Categories;