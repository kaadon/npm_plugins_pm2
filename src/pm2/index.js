export class Pm2Class {
    pm2Client
    static instance

    static getInstance() {
        if (!Pm2Class.instance) {
            Pm2Class.instance = new Pm2Class();
        }
        return Pm2Class.instance;
    }

    constructor() {
        this.pm2Client = require("pm2")
    }

    connectAsync = () => {
        return new Promise((resolve, reject) => {
            this.pm2Client.connect((err) => {
                if (err) reject(err);
                resolve();
            });
        });
    };
    restartAsync = (process) => {
        return new Promise((resolve, reject) => {
            this.pm2Client.restart(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    stopAsync = (process) => {
        return new Promise((resolve, reject) => {
            this.pm2Client.stop(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    reloadAsync = (process) => {
        return new Promise((resolve, reject) => {
            this.pm2Client.reload(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    killDaemonAsync = () => {
        return new Promise((resolve, reject) => {
            this.pm2Client.reload((err, proc) => {
                if (err) reject(err);
                resolve(proc);
            });
        });
    };
    describeAsync = (process) => {
        return new Promise((resolve, reject) => {
            this.pm2Client.describe(process, (err, proc) => {
                if (err) reject(err);
                resolve(proc[0]);
            });
        });
    };
    listAsync = () => {
        return new Promise((resolve, reject) => {
            this.pm2Client.list((err, processDescriptionList) => {
                if (err) reject(err);
                resolve(processDescriptionList);
            });
        });
    };
    startAsync = (config) => {
        return new Promise((resolve, reject) => {
            this.pm2Client.start(config, (err, apps) => {
                if (err) reject(err);
                resolve(apps);
            })
        })
    }
}

export async function restart(process) {
    let _Pm2 = Pm2Class.getInstance()
    try {
        await _Pm2.connectAsync();
        let _test = await _Pm2.describeAsync(process);
        if (!_test) return Promise.reject(`Didn't find ${process}`);
        let response = await _Pm2.restartAsync(process);
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    } finally {
        _Pm2.pm2Client.disconnect();
    }
}


