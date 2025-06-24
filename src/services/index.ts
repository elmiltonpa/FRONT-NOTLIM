import axios from "axios";

export const Ejecutar = async (codigo: string) => {
    try {
        const response = await axios.post("http://localhost:3000/ejecutar", {
            codigo: codigo
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { error: error.response?.data || "Error de red" };
        } else {
            return { error: "Error desconocido" };
        }
    }
}
