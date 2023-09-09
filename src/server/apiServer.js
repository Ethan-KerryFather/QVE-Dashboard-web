// import mariadb from "mariadb";

// const pool = mariadb.createPool({
//   host: process.env.REACT_APP_DATABASE_HOST,
//   user: process.env.REACT_APP_DATABASE_USER,
//   password: process.env.REACT_APP_DATABASE_PASSWORD,
//   database: "data",
//   connectionLimit: 5,
// });

// export async function fetchData() {
//   const conn = await pool.getConnection();

//   try {
//     const data = await conn.query(
//       "select * from wallet_balances where owner_name = ?",
//       ["jung"]
//     );
//     console.log(data);
//     return { success: true, data: data };
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     return { success: false };
//   } finally {
//     conn.release();
//   }
// }
