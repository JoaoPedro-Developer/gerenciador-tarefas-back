export const notFoundError = (res) => {
    return res.status(404).send('Este dado não foi encontrada no banco de dados.')
}
