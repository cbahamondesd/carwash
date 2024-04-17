export const capitalizeTransform = (param) =>
    `${String(param).charAt(0).toUpperCase()}${String(param).slice(
        1,
        param.length
    )}`
