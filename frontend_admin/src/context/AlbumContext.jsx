import { createContext, useContext, useState } from 'react';
import { useAlbum } from '../hooks/useAlbum.js';


const AlbumContext = createContext(null);

export const AlbumProvider = ({ children }) => {
    const value = useAlbum();

    return (
        <AlbumContext.Provider value={value}>
            {children}
        </AlbumContext.Provider>
    );
};

export function useAlbumContext() {
    const context = useContext(AlbumContext);

    if (context === null) {
        throw new Error('useAlbumContext debe usarse dentro de un AlbumProvider');
    };

    return context;
};
