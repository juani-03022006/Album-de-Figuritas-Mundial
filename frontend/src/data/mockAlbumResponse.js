function createTeamStickers(ownedIds, teamSeed) {
  return Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;
    const orientation = id === 13 ? 'landscape' : 'portrait';

    return {
      id,
      orientation,
      photoUrl: `https://picsum.photos/seed/${teamSeed}-${id}/${orientation === 'landscape' ? 280 : 144}/${200}`,
      owned: ownedIds.includes(id),
    };
  });
}

export const mockAlbumResponse = {
  userId: 'demo',
  selections: [
    {
      id: 'ARG',
      name: 'ARGENTINA',
      association: 'Asociación del Fútbol Argentino',
      flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
      colors: {
        main: '#8fa7e6',
        accent1: '#f47833',
        accent2: '#3a5bb3',
        text: '#1c388c',
      },
      stickers: createTeamStickers([1, 2, 5, 13, 17], 'arg'),
    },
    {
      id: 'ESP',
      name: 'SPAIN',
      association: 'Real Federación Española de Fútbol',
      flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
      colors: {
        main: '#e63946',
        accent1: '#ffb703',
        accent2: '#a80000',
        text: '#ffffff',
      },
      stickers: createTeamStickers([1, 7, 13], 'esp'),
    },
    {
      id: 'BRA',
      name: 'BRAZIL',
      association: 'Confederação Brasileira de Futebol',
      flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
      colors: {
        main: '#009c3b',
        accent1: '#ffdf00',
        accent2: '#002776',
        text: '#ffffff',
      },
      stickers: createTeamStickers([2, 14], 'bra'),
    },
  ],
};
