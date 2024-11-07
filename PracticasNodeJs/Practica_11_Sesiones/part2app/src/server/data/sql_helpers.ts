// transacción para garantizar la coherencia.
//se requiere trabajo adicional para ejecutar instrucciones SQL en una transacción.

import { Database } from "sqlite3";

export class TransactionHelper {
    steps: [sql: string, params: any][] = [];


    // método add que se utiliza para crear una lista de instrucciones SQL y parámetros de consulta.
    add(sql: string, params: any): TransactionHelper {
        this.steps.push([sql, params]);
        return this;
    }

    run(db: Database): Promise<number> {
        return new Promise((resolve, reject) => {
            let index = 0;
            let lastRow: number = NaN;
            const cb = (err: any, rowID?: number) => {
                if (err) {
                db.run("ROLLBACK", () => reject());
                } else {
                lastRow = rowID ? rowID : lastRow;
                if (++index === this.steps.length) {
                db.run("COMMIT", () => resolve(lastRow));
                } else {
                this.runStep(index, db, cb);
                }
                }
            }
            db.run("BEGIN", () => this.runStep(0, db, cb));
        });
    }

    runStep(idx: number, db:Database, cb: (err: any, row: number) => void ){
        const [sql, params] = this.steps[idx];
        db.run(sql, params, function(err: any) {
            cb(err, this.lastID)
        })
    }
}


