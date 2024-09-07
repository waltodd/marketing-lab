import { init, tx, id } from "@instantdb/admin";

// ID for app: marketing-lab
const APP_ID = "3db1f0f5-d368-4a2b-9656-c72c6fdc64d4";
const TOKEN  = process.env.INSTANT_APP_ADMIN_TOKEN as string;
const db = init({ appId: APP_ID, adminToken: TOKEN });


export { db,id,tx };
