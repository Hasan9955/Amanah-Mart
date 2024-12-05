import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    access_secret: process.env.ACCESS_SECRET,
    access_exp: process.env.ACCESS_EXP,
    refresh_secret: process.env.REFRESH_SECRET,
    refresh_exp: process.env.REFRESH_EXP,
    reset_secret: process.env.RESET_SECRET,
    reset_exp: process.env.RESET_EXP,
    reset_link: process.env.RESET_LINK,
    app_email: process.env.APP_EMAIL,
    app_pass: process.env.APP_PASSWORD,
}