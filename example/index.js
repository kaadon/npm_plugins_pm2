import {pm2} from "../pm2";
pm2.restart("list").then(console.log).catch(console.log)