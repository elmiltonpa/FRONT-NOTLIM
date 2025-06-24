import axios from "axios";

const URL = import.meta.env.VITE_URL

export const Ejecutar = async (codigo: string) => {
    try {
        const response = await axios.post(URL + '/ejecutar', {
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
