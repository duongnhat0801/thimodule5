import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import * as productService from "../../services/ProductService";

const ProductForm = ({ initialValues, categories }) => {
    const navigate = useNavigate();
    const id = initialValues.id;

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được bỏ trống!')
                .min(3, 'Tên không được ít hơn 3 ký tự!'),
            price: Yup.number().required('Giá sản phẩm không được bỏ trống!')
                .min(100000, 'Giá sản phẩm ít nhất là 100.000!')
                .max(1000000000, 'Giá sản phẩm tối đa là 1.000.000.000!'),
            quantity: Yup.number().required('Số lượng không được bỏ trống!')
                .min(1, 'Số lượng không được bé hơn 1!')
                .max(10000, 'Số lượng tối đa là 10.000!'),
            productCode: Yup.string().required('Mã sản phẩm không được bỏ trống!')
                .matches(/^PROD-\d{4}$/, 'Mã sản phẩm có định dạng "PROD-xxxx", với xxxx là các chữ số!'),
            entryDate: Yup.date().required('Ngày nhập không được bỏ trống!')
                .max(new Date(), 'Ngày nhập không được lớn hơn ngày hiện tại!'),
            description: Yup.string().required('Mô tả sản phẩm không được bỏ trống!')
        }),
        onSubmit: async (values) => {
            try {
                const request = id
                    ? productService.updateProduct(id, values)
                    : productService.saveProduct(values);

                await request;
                toast.success(id ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!', {
                    theme: "colored"
                });
                navigate('/');
            } catch (error) {
                toast.error('Đã có lỗi xảy ra!', { theme: "colored" });
                console.error("Error submitting form:", error);
            }
        }
    });

    return (
        <div className="container">
            <div className="w-50 mx-auto mt-5">
                <h1 className="text-center mb-4">{id ? 'Chỉnh sửa' : 'Thêm mới'}</h1>
                <div className="shadow p-5 rounded-3">
                    <form onSubmit={formik.handleSubmit}>
                        {/* Form fields here */}
                        <div className="mb-3">
                            <label htmlFor="productCode" className="form-label">Mã sản phẩm</label>
                            <input
                                id="productCode"
                                name="productCode"
                                type="text"
                                className={`form-control ${formik.touched.productCode && formik.errors.productCode ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.productCode}
                            />
                            {formik.touched.productCode && formik.errors.productCode ? (
                                <div className="invalid-feedback">{formik.errors.productCode}</div>
                            ) : null}
                        </div>
                        {/* Repeat for other fields */}
                        <div className="text-end">
                            <Link className="btn btn-danger me-3" to="/">Hủy bỏ</Link>
                            <button type="submit" className="btn btn-primary">{id ? 'Lưu' : 'Thêm'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
