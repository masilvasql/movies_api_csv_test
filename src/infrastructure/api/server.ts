import dotenv from 'dotenv'
import { app } from './express'
import CsvReader from '../../infrastructure/file/csv_reader'
import path from 'path';

const csvReader = new CsvReader()
dotenv.config()

const port: number = Number(process.env.PORT) || 3000

async function startServer() {
    const csvFilePath = path.resolve(__dirname, '../../assets/movielist.csv');
    try {
        await csvReader.insertCsvDataOnDatabase({
            batchSize: 100,
            filePath: csvFilePath,
            isToIgnoreFirstLine: true
        })
    } catch (err) {
        console.log(err)
    }

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

(async () => {
    await startServer()
})()