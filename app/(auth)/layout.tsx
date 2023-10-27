import React, { FC } from 'react'

const Layout:FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

export default Layout