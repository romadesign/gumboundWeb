import mysql from 'serverless-mysql' // <-- initialize with function call


// Require and initialize outside of your main handler
export const conn = mysql({
    config: {
      host     : "localhost",
      user     : "root",
      password : "",
      port: 3310,
      database : "db_clone",
    }
  })