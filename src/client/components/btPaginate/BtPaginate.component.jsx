import style from './BtPaginate.module.sass'

export const BtPaginateComponent = ({pagination, qry}) => {
    const {arrayPage, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage} = pagination

    const handleQuery = (page) => {
        let updatedQuery = qry.query;
        const pageParam = `page=${page}`;

        if (qry.query.includes('page=')) {
            updatedQuery = qry.query.replace(/page=\d+/, pageParam)
        } else {
            updatedQuery = `${qry.query}&${pageParam}`
        }

        qry.setQuery(updatedQuery)
    }

    return (
        <div className={style.container_pagination}>
            <div className={style.start}>
                <button onClick={()=>handleQuery(1)} disabled={!hasPrevPage}>Start</button>
                <button onClick={()=>handleQuery(prevPage)} disabled={!hasPrevPage}>Prev</button>
            </div>
            <div className={style.center}>
                {arrayPage.map((page, index) => (
                    <button onClick={()=>handleQuery(page)} key={index}>{page}</button>
                ))}
            </div>
            <div className={style.end}>
                <button onClick={()=>handleQuery(nextPage)} disabled={!hasNextPage}>Next</button>
                <button onClick={()=>handleQuery(totalPages)} disabled={!hasNextPage}>End</button>
            </div>
        </div>
    )
}