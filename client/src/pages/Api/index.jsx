import useFetch from "../../Hooks/useFetch";

function Api() {
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/photos"
    );
    return (
        <div>
            <h1>Api de https://jsonplaceholder.typicode.com/</h1>

            <ul>
                {error && <li>Error {error} en la API</li>}
                {loading && <li>Cargando API...</li>}
                {data?.slice(0, 3).map(
                    (
                    res // Slice para limitar la cantidad de resultados.
                    ) => (
                    <div key={res.id}>
                        <li>{res.id}</li>
                        <li>{res.title}</li>
                        <li>
                        <img src={res.url} alt={res.title} />
                        </li>
                    </div>
                    )
                )}
                </ul>

                </div>
        );
    }

export default Api;