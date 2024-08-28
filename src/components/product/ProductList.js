import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as productService from "../../services/ProductService";
import * as categoryService from "../../services/CategoryService";
import ProductItem from "./ProductItem";
import emptyData from "../../lottie/empty.json";
import Lottie from "lottie-react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');




    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await productService.getAllProducts(name, categoryId)
                setProducts(data);
            } catch {
                toast.error("Đã có lỗi xảy ra!");
            }
        };

        fetchProducts();
    }, [name, categoryId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await categoryService.getAllCategories();
                setCategories(data);
            } catch {
                toast.error("Đã có lỗi xảy ra!");
            }
        };
        fetchCategories();
    }, []);


    return (
        <div className="container">
            <h1 className="text-center my-4">Quản lý sản phẩm</h1>
            <div className="p-5 rouded-3 shadow">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className={"flex-grow-1 d-flex align-items-center"}>
                        <input
                            className="form-control w-25 me-4"
                            type="search"
                            placeholder="Nhập tên sản phẩm..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <select
                            className="form-select w-25"
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Chọn một phân loại</option>
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }

                        </select>
                    </div>
                    <Link to="/add" className="btn btn-success mb-3">Thêm sản phẩm</Link>

                </div>
                {
                    products.length === 0
                    ? <div className={"w-25 mx-auto"}>
                            <Lottie animationData={emptyData} loop={true} />
                        </div>
                    : <table className="table table-bordered align-middle">
                        <thead>
                        <tr>
                        <th>#</th>
                            <th>Mã Sản Phẩm</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Loại Sản Phẩm</th>
                            <th>Giá Bán</th>
                            <th>Số Lượng</th>
                            <th>Ngày Nhập</th>
                            <th>Mô tả</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <ProductItem index={index} product={product} />
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
};

export default ProductList;
