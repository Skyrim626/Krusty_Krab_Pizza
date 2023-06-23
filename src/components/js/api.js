// api.js

export function fetchData(procedureType) {
  return fetch("http://localhost/backend/generators.php", {
    method: "POST",
    body: JSON.stringify({ procedureType }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });
}
