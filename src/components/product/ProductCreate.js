import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import * as categoryService from "../../services/CategoryService";
import * as productService from "../../services/ProductService";

export default function ProductCreate() {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: '',
        productCode: '',
        price: '',
        quantity: '',
        entryDate: '',
        categoryId: 1,
        description: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await categoryService.getAllCategories();
                setCategories(data);
            } catch (e) {
                console.error("Error fetching categories:", e); // Improved error logging
                toast.error("Đã có lỗi xảy ra khi lấy danh sách loại sản phẩm!");
                navigate('/');
            }
        };
        fetchCategories();
    }, [navigate]);

    const handleSubmit = async (values) => {
        try {
            await productService.saveProduct(values);
            toast.success('Thêm sản phẩm thành công!', { theme: "colored" });
            navigate('/');
        } catch (error) {
            toast.error('Đã có lỗi xảy ra!', { theme: "colored" });
            console.error("Error saving product:", error);
        }
    };

    return (
        categories.length > 0 && (
            <ProductForm initialValues={initialValues} categories={categories} onSubmit={handleSubmit} />
        )
    );
}
