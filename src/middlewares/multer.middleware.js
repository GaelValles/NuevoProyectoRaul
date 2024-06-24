import multer from 'multer';
import path from 'path';

// Configuración de multer para almacenamiento en disco
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads/'); // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;
