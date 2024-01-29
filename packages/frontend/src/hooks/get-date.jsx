export const getDateFormat = (date) => {
    const dateString = new Date(date).toLocaleString("en-GB").split(",")[0];
    const dateArray = dateString.split("/");
    const newFormat = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    return newFormat;
};