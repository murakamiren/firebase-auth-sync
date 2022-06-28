import axios from "axios";
import { useState } from "react";

export const useAxios = async <T>(fetchUrl: string) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	await setIsLoading(true);
	const res = await axios.get(fetchUrl);
	const getData = await res.data;
	await setData(getData);
	await setIsLoading(false);
	return { data, isLoading };
};
