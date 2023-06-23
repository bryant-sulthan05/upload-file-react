import Products from "../models/ProductsModel.js";
import path from "path"
import fs from "fs"

export const getProducts = async (req, res) => {
    try {
        const response = await Products.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const getProductById = async (req, res) => {
    try {
        const response = await Products.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const createProduct = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'No File added' });
    const { name, price } = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });

    if (size > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Products.create({
                name: name,
                image: fileName,
                url: url,
                price: price
            });
            res.status(201).json({ msg: "Produk berhasil ditambah" });
        } catch (error) {
            console.log(error.message);
        }
    });
}
export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let fileName = "";
    if (req.files === null) {
        fileName = Products.image;
    } else {
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.jpeg', '.jpg', '.png'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });

        if (size > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { name, price } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Products.update({
            name: name,
            image: fileName,
            url: url,
            price: price
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Produk berhasil diupdate!" });
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    try {
        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);
        await Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Data berhasil dihapus!" });
    } catch (error) {
        console.log(error.message);
    }
}