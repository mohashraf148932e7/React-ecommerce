import axios from "axios";

const baseUrl = 'http://localhost:3001/products'
const getAllProducts = async () => axios.get(baseUrl)
const getProductById = async (id) => axios.get(`${baseUrl}/${id}`)
const addNewProduct = async (product) => axios.post(`${baseUrl}`, product)
const updateProduct = async (id, product) => axios.put(`${baseUrl}/${id}`, product)
const deleteProduct = async (id) => axios.delete(`${baseUrl}/${id}`)


export { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct }