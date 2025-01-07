import { useLocation } from 'react-router-dom';

export default function EditTaskData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const editTask = queryParams.get('editTask');

    console.log(editTask);

    return <div>EditTaskData</div>;
}
