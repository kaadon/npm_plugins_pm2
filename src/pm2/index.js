
export class Pm2Class {
    pm2
    constructor() {
        this.pm2 = require("pm2")
    }
    connectAsync =  () => {
        return new Promise((resolve, reject) => {
            this.pm2.connect((err) => {
                if (err) reject(err);
                resolve();
            });
        });
    };
    restartAsync =  (process) => {
        return new Promise((resolve, reject) => {
            this.pm2.restart(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    stopAsync =  (process) => {
        return new Promise((resolve, reject) => {
            this.pm2.stop(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    reloadAsync =  (process) => {
        return new Promise((resolve, reject) => {
            this.pm2.reload(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    killDaemonAsync =  () => {
        return new Promise((resolve, reject) => {
            this.pm2.reload((err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    describeAsync =  (process) => {
        return new Promise((resolve, reject) => {
            this.pm2.describe(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc[0]);
            });
        });
    };
     listAsync =  () => {
        return new Promise((resolve, reject) => {
            this.pm2.list((err, processDescriptionList) => {
                if (err) reject(err);
                resolve(processDescriptionList);
            });
        });
    };
    startAsync =  (config) => {
        return new Promise((resolve, reject) => {
            this.pm2.start(config,(err, apps)=>{
                if (err) reject(err);
                resolve(apps);
            })
        })
    }


}

export async function restart(process) {
    const Pm2 = new Pm2Class()
    try {
        await Pm2.connectAsync();
        let _test = await Pm2.describeAsync(process);
        if (!_test) return {err:`Didn't find ${process}`, response: undefined};
        if (_test.pm2_env.pm_exec_path === module.parent.parent.filename) {
            throw new Error("Can not restart PM2 BOT");
        }
        let response = await Pm2.restartAsync(process);
        return {err: undefined, response};
    } catch (err) {
        return {err, response: undefined};
    } finally {
        Pm2.pm2.disconnect();
    }
}


