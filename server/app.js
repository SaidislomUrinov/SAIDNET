import './src/configs/db.js';
import './src/configs/configure.js';
import express from 'express';
import fileUpload from 'express-fileupload';
import envConfig from './src/configs/env.config.js';
import router from './src/router.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/uploads', express.static('uploads'));

app.use('/api', router);

app.listen(envConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
});