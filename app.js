// 로컬 DB 연동: oracledb 5버전
// aws rds DB 연동: oracledb 6버전
const express = require('express')
const dbconfig = require("./dbconfig"); // db 세팅
require("dotenv").config();
const app = express()
const SERVER_PORT = 3001;

const server = app.listen(SERVER_PORT, () => {
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
            FROM employees`, //TEST TABLE -- 테이블 이름은 필요에 따라 수정.
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