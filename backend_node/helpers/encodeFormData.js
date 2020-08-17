const encodeFormData = (data) => {
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

module.exports = encodeFormData;
// export default encodeFormData;