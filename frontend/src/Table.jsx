import React from "react";
const Table = ({ data }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>ID  </th>
                    <th>Customer Name  </th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.cust_name}</td>

                    </tr>

                ))}

            </tbody>
        </table>
    )

}
export default Table