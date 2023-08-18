const express = require('express')
const dbconfig = require("./dbconfig");
const app = express()

const server = app.listen(3001, () => {
    console.log('server start, port 3001')
})

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

app.get('', function(request, response) {
    getSelect(request, response)
})

async function getSelect(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            `SELECT *
            FROM gpt_questions`, //gpt_questions
            // [1], // num의 값 전달
        )

        response.send(result.rows)
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}