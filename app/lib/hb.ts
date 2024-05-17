// TODO: Check domain availability from HB.BY API
export const checkAvailability = async (domainName: string) => {
	domainName;
	await new Promise((res) => setTimeout(res, Math.random() * 1000));
	const isAvailable = Math.random() > 0.5;
	return isAvailable;
};
