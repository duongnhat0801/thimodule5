import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as productService from "../../services/ProductService";
import { Modal, Button } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [top, setTop] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async (fetchFunction, parameter) => {
        try {
            const { data } = await fetchFunction(parameter);
            setProducts(data);
        } catch {
            toast.error("Đã có lỗi xảy ra!");
        }
    };

    useEffect(() => {
        fetchProducts(productService.getAllProducts, name);
    }, [name]);

    const handleSearchTop = () => {
        if (top < 1) {
            toast.error("Giá trị tìm kiếm phải lớn hơn 0!", {
                theme : "colored"
            });
            return;
        }
        fetchProducts(productService.getProductsByTopPrice, top);
    };

    const handleDelete = async (productId) => {
        try {
            await productService.deleteProduct(productId);
            toast.success("Xóa sản phẩm thành công!", {theme: "colored"});
            setProducts(products.filter(product => product.id !== productId));
        } catch {
            toast.error("Đã có lỗi xảy ra!");
        }
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const confirmDelete = () => {
        if (selectedProduct) {
            handleDelete(selectedProduct.id);
            handleCloseModal();
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Quản lý sản phẩm</h1>
            <div className="p-5 rouded-3 shadow">
                <Link to="/add" className="btn btn-success mb-3">Thêm sản phẩm</Link>

                <div className="d-flex justify-content-between mb-3">
                    <input
                        className="form-control w-25"
                        type="search"
                        placeholder="Nhập tên sản phẩm..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <table className="table table-bordered align-middle">
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
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.productCode}</td>
                            <td>{product.name}</td>
                            <td>{product.category?.name || 'Không xác định'}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>{product.quantity}</td>
                            <td>{product.entryDate}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Modal show={!!selectedProduct} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm <strong>{selectedProduct?.name}</strong> không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;
